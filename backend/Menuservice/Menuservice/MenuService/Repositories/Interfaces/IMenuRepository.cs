using System.Collections.Generic;
using MenuService.Models;

namespace MenuService.Repositories.Interfaces
{
    // Interface for database operations on MenuItemList table
    public interface IMenuRepository
    {
        // Get all menu items from database
        IEnumerable<MenuItemList> GetAllMenuItems();

        // Get single menu item by ID
        MenuItemList? GetMenuItemById(int id);

        // Add a new menu item
        MenuItemList AddMenuItem(MenuItemList menuItem);

        // Update an existing menu item
        void UpdateMenuItem(MenuItemList menuItem);

        // Delete a menu item
        void DeleteMenuItem(MenuItemList menuItem);
    }
}
