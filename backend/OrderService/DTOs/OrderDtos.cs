namespace backend.DTOs
{
    public class CreateOrderDto
    {
        public int TableId { get; set; }
        public string OrderItems { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; } = "Pending";
        public int Quantity { get; set; } = 1;
        public string Duration { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = "Pending";
        public string? TransactionId { get; set; }
        public string? PaymentMethod { get; set; }
    }

    public class UpdateOrderDto
    {
        public int TableId { get; set; }
        public string OrderItems { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; } = "Pending";
        public int Quantity { get; set; } = 1;
        public string Duration { get; set; } = string.Empty;
    }

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
        public string PaymentStatus { get; set; } = string.Empty;
        public string? TransactionId { get; set; }
        public string? PaymentMethod { get; set; }
    }

    public class PaymentRequestDto
    {
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = "UPI";
    }

    public class PaymentResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string TransactionId { get; set; } = string.Empty;
    }
}
