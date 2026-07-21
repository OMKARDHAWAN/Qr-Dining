namespace MenuService.DTOs
{
    // DTO for creating a Category
    public class CategoryCreateDto
    {
        public string CategoryName { get; set; } = string.Empty;
    }

    // DTO for updating a Category
    public class CategoryUpdateDto
    {
        public string CategoryName { get; set; } = string.Empty;
    }

    // DTO for returning Category details to frontend
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}
