using System.ComponentModel.DataAnnotations;

namespace OrderManagementService.DTOs
{
    // dto for updating order
    public class UpdateOrderDto
    {
        [Required(ErrorMessage = "Order details cannot be empty")]
        public string OrderDetails { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        public string Duration { get; set; } = string.Empty;

        [Required(ErrorMessage = "Status cannot be empty")]
        public string Status { get; set; } = string.Empty;

        public int TableId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
        public int Quantity { get; set; }
    }
}
