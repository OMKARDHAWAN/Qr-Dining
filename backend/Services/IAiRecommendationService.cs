using backend.DTOs;

namespace backend.Services
{
    public interface IAiRecommendationService
    {
        Task<IEnumerable<DishRecommendationDto>> GetPersonalizedRecommendationsAsync(int userId, int count = 5);
        Task<IEnumerable<DishRecommendationDto>> GetPopularDishesPredictionAsync(int count = 5);
        Task<ModelTrainingStatusDto> TrainModelAsync();
        Task<bool> RecordUserInteractionAsync(UserInteractionCreateDto dto);
    }
}
