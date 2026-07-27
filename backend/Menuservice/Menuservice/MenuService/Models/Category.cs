using System.Collections.Generic;

namespace MenuService.Models
{
    // Category database entity mapping to Category table
    public class Category
    {
        // Primary key
        public int CategoryId { get; set; }
        
        // Category Name (e.g. Pizza, Burger)
        public string CategoryName { get; set; } = string.Empty;

        // Navigation property: One Category can have many Menu Items
        public virtual ICollection<MenuItemList> MenuItems { get; set; } = new List<MenuItemList>();
    }
}
