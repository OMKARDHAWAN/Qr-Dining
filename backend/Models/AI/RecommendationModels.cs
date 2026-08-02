namespace backend.Models.AI
{
    public class DishRatingData
    {
        public float UserId { get; set; }
        public float InventoryId { get; set; }
        public float Label { get; set; }
    }

    public class DishRatingPrediction
    {
        public float Label { get; set; }
        public float Score { get; set; }
    }
}
