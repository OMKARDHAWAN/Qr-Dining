using Microsoft.AspNetCore.Http;

namespace MenuService.DTOs
{
    // DTO for creating a MenuItemList
    public class MenuCreateDto
    {
        public string CategoryName { get; set; } = string.Empty;
        public string ItemName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public bool Status { get; set; }
        
        // Uploaded file
        public IFormFile? Image { get; set; }
    }

    // DTO for updating a MenuItemList
    public class MenuUpdateDto
    {
        public string CategoryName { get; set; } = string.Empty;
        public string ItemName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public bool Status { get; set; }
        
        // Optional uploaded file
        public IFormFile? Image { get; set; }
    }

    // DTO for returning MenuItemList details to frontend
    public class MenuDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string ItemName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public bool Status { get; set; }
        
        // Complete URL of the image
        public string? ImageUrl { get; set; }
    }
}
