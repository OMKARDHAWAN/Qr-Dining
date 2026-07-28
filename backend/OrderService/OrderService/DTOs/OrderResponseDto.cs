namespace OrderService.DTOs
{
    // dto for sending order data back to client
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public string OrderItems { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Duration { get; set; } = string.Empty;
    }
}
