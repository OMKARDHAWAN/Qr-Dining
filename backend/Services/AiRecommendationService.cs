using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;

namespace backend.Services
{
    public class AiRecommendationService : IAiRecommendationService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AiRecommendationService> _logger;

        // In-memory trained model cache (Collaborative Filtering Matrix & Popularity Weights)
        private static readonly ConcurrentDictionary<int, ConcurrentDictionary<int, float>> _userItemMatrix = new();
        private static readonly ConcurrentDictionary<int, float> _itemPopularityScores = new();
        private static bool _isTrained = false;
        private static DateTime _lastTrainedAt = DateTime.MinValue;

        public AiRecommendationService(
            ApplicationDbContext context,
            ILogger<AiRecommendationService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ModelTrainingStatusDto> TrainModelAsync()
        {
            try
            {
                await EnsureSeedInteractionsExistAsync();

                var interactions = await _context.UserInteractions.AsNoTracking().ToListAsync();
                var inventories = await _context.Inventories.AsNoTracking().ToListAsync();

                _userItemMatrix.Clear();
                _itemPopularityScores.Clear();

                // Build User-Item Interaction Matrix & Item Popularity Scores
                foreach (var interaction in interactions)
                {
                    // Update User-Item Matrix
                    var userRow = _userItemMatrix.GetOrAdd(interaction.UserId, _ => new ConcurrentDictionary<int, float>());
                    userRow[interaction.InventoryId] = interaction.Rating;

                    // Update Item Popularity Score
                    float weight = interaction.InteractionType == "Order" ? 1.5f : 1.0f;
                    _itemPopularityScores.AddOrUpdate(
                        interaction.InventoryId,
                        interaction.Rating * weight,
                        (key, current) => current + (interaction.Rating * weight)
                    );
                }

                _isTrained = true;
                _lastTrainedAt = DateTime.UtcNow;

                _logger.LogInformation("Native C# Recommendation Model successfully trained on {Count} interaction records.", interactions.Count);

                return new ModelTrainingStatusDto
                {
                    IsSuccess = true,
                    Message = $"Embedded C# Recommendation Model successfully trained on {interactions.Count} interaction records.",
                    TrainingRecordCount = interactions.Count,
                    TrainedAt = _lastTrainedAt
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to train native C# recommendation model.");
                return new ModelTrainingStatusDto
                {
                    IsSuccess = false,
                    Message = $"Model training error: {ex.Message}",
                    TrainedAt = DateTime.UtcNow
                };
            }
        }

        public async Task<IEnumerable<DishRecommendationDto>> GetPersonalizedRecommendationsAsync(int userId, int count = 5)
        {
            if (!_isTrained)
            {
                await TrainModelAsync();
            }

            var dishes = await _context.Inventories.AsNoTracking().ToListAsync();
            if (!dishes.Any()) return Enumerable.Empty<DishRecommendationDto>();

            _userItemMatrix.TryGetValue(userId, out var userRatings);

            var scoredDishes = new List<DishRecommendationDto>();

            foreach (var dish in dishes)
            {
                float predictedScore = 4.0f; // Default baseline
                int matchPercentage = 85;
                string reason = "✨ Recommended based on top customer ratings";

                if (userRatings != null && userRatings.TryGetValue(dish.Id, out float rating))
                {
                    predictedScore = Math.Min(5.0f, rating * 1.05f);
                    matchPercentage = Math.Min(99, (int)(predictedScore / 5.0f * 100));
                    reason = $"❤️ Based on your previous {dish.Category} order preferences";
                }
                else if (_itemPopularityScores.TryGetValue(dish.Id, out float popScore))
                {
                    predictedScore = Math.Min(4.9f, 3.8f + (popScore / 100.0f));
                    matchPercentage = Math.Min(98, (int)(predictedScore / 5.0f * 100));
                    reason = $"🔥 Highly rated in {dish.Category} among diners";
                }

                scoredDishes.Add(new DishRecommendationDto
                {
                    InventoryId = dish.Id,
                    InventoryName = dish.InventoryName,
                    Category = dish.Category,
                    Price = dish.Price,
                    Status = dish.Status,
                    PredictedScore = (float)Math.Round(predictedScore, 1),
                    MatchPercentage = matchPercentage,
                    RecommendationReason = reason
                });
            }

            return scoredDishes.OrderByDescending(d => d.PredictedScore).Take(count);
        }

        public async Task<IEnumerable<DishRecommendationDto>> GetPopularDishesPredictionAsync(int count = 5)
        {
            if (!_isTrained)
            {
                await TrainModelAsync();
            }

            var dishes = await _context.Inventories.AsNoTracking().ToListAsync();
            var result = dishes.Select(d =>
            {
                _itemPopularityScores.TryGetValue(d.Id, out float popScore);
                float predictedScore = Math.Min(4.95f, 4.0f + (popScore / 80.0f));
                int matchPercentage = Math.Min(99, (int)(predictedScore / 5.0f * 100));

                return new DishRecommendationDto
                {
                    InventoryId = d.Id,
                    InventoryName = d.InventoryName,
                    Category = d.Category,
                    Price = d.Price,
                    Status = d.Status,
                    PredictedScore = (float)Math.Round(predictedScore, 1),
                    MatchPercentage = matchPercentage,
                    RecommendationReason = "🔥 Top Liked & Trending Dish across all tables"
                };
            }).OrderByDescending(d => d.PredictedScore).Take(count);

            return result;
        }

        public async Task<bool> RecordUserInteractionAsync(UserInteractionCreateDto dto)
        {
            var interaction = new UserInteraction
            {
                UserId = dto.UserId,
                InventoryId = dto.InventoryId,
                Rating = dto.Rating,
                InteractionType = dto.InteractionType,
                CreatedAt = DateTime.UtcNow
            };

            _context.UserInteractions.Add(interaction);
            await _context.SaveChangesAsync();

            // Incrementally update model
            var userRow = _userItemMatrix.GetOrAdd(dto.UserId, _ => new ConcurrentDictionary<int, float>());
            userRow[dto.InventoryId] = dto.Rating;

            float weight = dto.InteractionType == "Order" ? 1.5f : 1.0f;
            _itemPopularityScores.AddOrUpdate(
                dto.InventoryId,
                dto.Rating * weight,
                (key, current) => current + (dto.Rating * weight)
            );

            return true;
        }

        private async Task EnsureSeedInteractionsExistAsync()
        {
            try
            {
                await _context.Database.EnsureCreatedAsync();
                if (await _context.UserInteractions.AnyAsync()) return;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not verify UserInteractions table existence.");
                return;
            }

            var existingDishes = await _context.Inventories.ToListAsync();
            if (!existingDishes.Any())
            {
                existingDishes = new List<Inventory>
                {
                    new Inventory { InventoryName = "Paneer Butter Masala", Price = 250, Qty = 50, Status = "In Stock", Category = "Main Course" },
                    new Inventory { InventoryName = "Chicken Biryani", Price = 320, Qty = 40, Status = "In Stock", Category = "Main Course" },
                    new Inventory { InventoryName = "Garlic Naan", Price = 45, Qty = 100, Status = "In Stock", Category = "Breads" },
                    new Inventory { InventoryName = "Gulab Jamun", Price = 90, Qty = 60, Status = "In Stock", Category = "Desserts" },
                    new Inventory { InventoryName = "Cold Coffee", Price = 120, Qty = 30, Status = "In Stock", Category = "Beverages" }
                };
                _context.Inventories.AddRange(existingDishes);
                await _context.SaveChangesAsync();
            }

            var seedInteractions = new List<UserInteraction>();
            var random = new Random(42);

            for (int userId = 1; userId <= 10; userId++)
            {
                foreach (var dish in existingDishes)
                {
                    float rating = (float)(random.NextDouble() * 2.0 + 3.0);
                    seedInteractions.Add(new UserInteraction
                    {
                        UserId = userId,
                        InventoryId = dish.Id,
                        Rating = (float)Math.Round(rating, 1),
                        InteractionType = "Order",
                        CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 30))
                    });
                }
            }

            _context.UserInteractions.AddRange(seedInteractions);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Seeded initial user interactions dataset.");
        }
    }
}
