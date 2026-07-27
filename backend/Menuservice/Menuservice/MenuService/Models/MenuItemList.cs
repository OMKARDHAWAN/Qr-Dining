namespace MenuService.Models
{
    // MenuItemList database entity mapping to MenuItemList table
    public class MenuItemList
    {
        // Primary key of MenuItemList
        public int Id { get; set; }

        // Foreign key referencing Category table
        public int CategoryId { get; set; }

        // Name of the menu item
        public string ItemName { get; set; } = string.Empty;

        // Price of the menu item
        public decimal Price { get; set; }

        // Description of the menu item
        public string? Description { get; set; }

        // Image relative path (e.g. /images/pizza.jpg)
        public string? ImageUrl { get; set; }

        // Available status (true = Available, false = Unavailable)
        public bool Status { get; set; }

        // Navigation property to parent Category
        public virtual Category? Category { get; set; }
    }
}
