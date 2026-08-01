using backend.AI;
using backend.DTOs;
using Microsoft.Extensions.Options;

namespace backend.Services;

/// <summary>
/// Four thin domain adapters around independently deployed Azure AutoML endpoints.
/// The local branch is solely for a first-run developer experience; production must configure endpoint URI/key and disable it.
/// </summary>
public sealed class RestaurantAiServices : IRecommendationAiService, IDemandPredictionService, IOfferPredictionService, IInventoryPredictionService
{
    private readonly IAzureMlScoringClient _scoringClient;
    private readonly AzureAiOptions _options;

    public RestaurantAiServices(IAzureMlScoringClient scoringClient, IOptions<AzureAiOptions> options)
    {
        _scoringClient = scoringClient;
        _options = options.Value;
    }

    public async Task<RecommendationResponseDto> GetRecommendationsAsync(int customerId, CancellationToken cancellationToken = default)
    {
        var profile = CustomerProfile.For(customerId);
        if (UseFallback(_options.Recommendation)) return LocalRecommendations(profile);

        var response = await _scoringClient.ScoreAsync(_options.Recommendation,
            ["CustomerId", "Age", "VegOrNonVeg", "PreviousOrders", "FavouriteCuisine", "AverageBill"],
            [[profile.CustomerId, profile.Age, profile.VegOrNonVeg, profile.PreviousOrders, profile.FavouriteCuisine, profile.AverageBill]], cancellationToken);
        var ranked = AzureMlResponseReader.ReadClassProbabilities(response.RootElement).Take(3)
            .Select(x => new RecommendationItemDto(x.Label, (decimal)Math.Round(x.Confidence, 4), $"Azure AutoML match for {profile.FavouriteCuisine} preferences."))
            .ToList();
        return new RecommendationResponseDto(customerId, "AzureML", ranked);
    }

    public async Task<DemandPredictionResponseDto> GetDemandAsync(string dish, CancellationToken cancellationToken = default)
    {
        var tomorrow = DateOnly.FromDateTime(DateTime.Today.AddDays(1));
        var weather = "Clear"; // replace with a weather provider before production; record the same feature at training and scoring time.
        var festival = FestivalFor(tomorrow);
        if (UseFallback(_options.Demand)) return new DemandPredictionResponseDto(dish, tomorrow, LocalDemand(dish, tomorrow, festival), "LocalDevelopmentFallback");

        var response = await _scoringClient.ScoreAsync(_options.Demand,
            ["Date", "Day", "Month", "Weather", "Festival", "Dish"],
            [[tomorrow.ToString("yyyy-MM-dd"), tomorrow.DayOfWeek.ToString(), tomorrow.Month, weather, festival, dish]], cancellationToken);
        return new DemandPredictionResponseDto(dish, tomorrow, Math.Max(0, (int)Math.Round(AzureMlResponseReader.ReadNumericPrediction(response.RootElement))), "AzureML");
    }

    public async Task<OfferPredictionResponseDto> GetOfferAsync(int customerId, CancellationToken cancellationToken = default)
    {
        var profile = CustomerProfile.For(customerId);
        var customerType = profile.PreviousOrders >= 18 ? "Loyal" : profile.AverageBill >= 700 ? "Premium" : "Regular";
        var festival = FestivalFor(DateOnly.FromDateTime(DateTime.Today));
        if (UseFallback(_options.Offer))
        {
            var discount = festival != "None" ? "20%" : customerType == "Loyal" ? "15%" : "10%";
            return new OfferPredictionResponseDto(customerId, discount, $"SMART{discount.TrimEnd('%')}{customerId:D4}", discount == "20%" ? .82m : .74m, "LocalDevelopmentFallback");
        }

        var response = await _scoringClient.ScoreAsync(_options.Offer,
            ["CustomerType", "AverageBill", "Festival"], [[customerType, profile.AverageBill, festival]], cancellationToken);
        var options = AzureMlResponseReader.ReadClassProbabilities(response.RootElement);
        var best = options.First();
        return new OfferPredictionResponseDto(customerId, best.Label, $"SMART{best.Label.Trim().Replace("%", string.Empty)}{customerId:D4}", (decimal)Math.Round(best.Confidence, 4), "AzureML");
    }

    public async Task<InventoryPredictionResponseDto> GetInventoryAsync(string ingredient, CancellationToken cancellationToken = default)
    {
        var snapshot = IngredientSnapshot.For(ingredient);
        var festival = FestivalFor(DateOnly.FromDateTime(DateTime.Today));
        decimal days;
        if (UseFallback(_options.Inventory)) days = snapshot.CurrentStock / snapshot.DailyUsage;
        else
        {
            var response = await _scoringClient.ScoreAsync(_options.Inventory,
                ["Ingredient", "CurrentStock", "DailyUsage", "Weekday", "Festival"],
                [[snapshot.Ingredient, snapshot.CurrentStock, snapshot.DailyUsage, DateTime.Today.DayOfWeek.ToString(), festival]], cancellationToken);
            days = Math.Max(0, (decimal)AzureMlResponseReader.ReadNumericPrediction(response.RootElement));
        }
        days = Math.Round(days, 1);
        var alert = days <= 3;
        var reorder = alert ? Math.Max(0, (int)Math.Ceiling(snapshot.DailyUsage * 7 - snapshot.CurrentStock)) : 0;
        return new InventoryPredictionResponseDto(snapshot.Ingredient, days, alert, reorder, UseFallback(_options.Inventory) ? "LocalDevelopmentFallback" : "AzureML");
    }

    private bool UseFallback(AzureMlEndpointOptions endpoint)
    {
        var configured = !string.IsNullOrWhiteSpace(endpoint.ScoringUri) && !string.IsNullOrWhiteSpace(endpoint.ApiKey);
        if (configured) return false;
        if (_options.UseLocalDevelopmentFallback) return true;
        throw new InvalidOperationException("Azure ML endpoint configuration is missing and local development fallback is disabled.");
    }

    Task<RecommendationResponseDto> IRecommendationAiService.GetAsync(int customerId, CancellationToken cancellationToken) => GetRecommendationsAsync(customerId, cancellationToken);
    Task<DemandPredictionResponseDto> IDemandPredictionService.GetAsync(string dish, CancellationToken cancellationToken) => GetDemandAsync(dish, cancellationToken);
    Task<OfferPredictionResponseDto> IOfferPredictionService.GetAsync(int customerId, CancellationToken cancellationToken) => GetOfferAsync(customerId, cancellationToken);
    Task<InventoryPredictionResponseDto> IInventoryPredictionService.GetAsync(string ingredient, CancellationToken cancellationToken) => GetInventoryAsync(ingredient, cancellationToken);

    private static RecommendationResponseDto LocalRecommendations(CustomerProfile p)
    {
        string[] preferred = p.VegOrNonVeg == "Veg"
            ? ["Paneer Butter Masala", "Veg Biryani", "Masala Dosa"]
            : ["Chicken Biryani", "Margherita Pizza", "Paneer Butter Masala"];
        var items = preferred.Select((item, index) => new RecommendationItemDto(item, .86m - index * .08m, $"Development preview aligned with {p.FavouriteCuisine} preferences.")).ToList();
        return new RecommendationResponseDto(p.CustomerId, "LocalDevelopmentFallback", items);
    }

    private static int LocalDemand(string dish, DateOnly date, string festival)
    {
        var baseDemand = 30 + Math.Abs(StringComparer.OrdinalIgnoreCase.GetHashCode(dish)) % 35;
        if (date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday) baseDemand += 20;
        if (festival != "None") baseDemand += 18;
        return baseDemand;
    }

    private static string FestivalFor(DateOnly date) => date.Month == 10 || (date.Month == 11 && date.Day <= 5) ? "Festival" : "None";
    private sealed record CustomerProfile(int CustomerId, int Age, string VegOrNonVeg, int PreviousOrders, string FavouriteCuisine, decimal AverageBill)
    {
        public static CustomerProfile For(int customerId) => new(customerId, 22 + customerId % 35, customerId % 3 == 0 ? "NonVeg" : "Veg", 4 + customerId % 24, customerId % 2 == 0 ? "North Indian" : "Italian", 250 + customerId % 600);
    }
    private sealed record IngredientSnapshot(string Ingredient, decimal CurrentStock, decimal DailyUsage)
    {
        public static IngredientSnapshot For(string ingredient)
        {
            var key = ingredient.Trim();
            return key.ToLowerInvariant() switch
            {
                "paneer" => new(key, 9, 4), "chicken" => new(key, 20, 7), "flour" => new(key, 35, 10),
                "tomato" => new(key, 7, 5), _ => new(key, 18, 5)
            };
        }
    }
}
