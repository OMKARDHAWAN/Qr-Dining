namespace backend.DTOs
{
    public class DishRecommendationDto
    {
        public int InventoryId { get; set; }
        public string InventoryName { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Status { get; set; } = string.Empty;
        public float PredictedScore { get; set; }
        public int MatchPercentage { get; set; }
        public string RecommendationReason { get; set; } = string.Empty;
    }

    public class UserInteractionCreateDto
    {
        public int UserId { get; set; }
        public int InventoryId { get; set; }
        public float Rating { get; set; } = 5.0f;
        public string InteractionType { get; set; } = "Order";
    }

    public class ModelTrainingStatusDto
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public int TrainingRecordCount { get; set; }
        public DateTime TrainedAt { get; set; } = DateTime.UtcNow;
    }
}
