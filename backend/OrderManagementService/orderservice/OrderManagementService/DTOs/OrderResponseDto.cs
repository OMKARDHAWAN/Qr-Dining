namespace OrderManagementService.DTOs
{
    // response object for client
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public string OrderDetails { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Duration { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int TableId { get; set; }
        public int Quantity { get; set; }
    }
}
