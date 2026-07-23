using System.ComponentModel.DataAnnotations;

namespace OrderManagementService.Models
{
    // order entity class
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string OrderDetails { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Duration { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = string.Empty;

        public int TableId { get; set; }

        public int Quantity { get; set; }
    }
}
