using System.Collections.Generic;
using MenuService.DTOs;

namespace MenuService.Services.Interfaces
{
    // Interface for MenuItemList service business logic
    public interface IMenuService
    {
        // Get all menu items mapped to DTO containing full ImageUrl
        IEnumerable<MenuDto> GetAllMenuItems(string baseUrl);

        // Get single menu item by ID
        MenuDto? GetMenuItemById(int id, string baseUrl);

        // Add a new menu item, dynamically resolving or creating the category
        MenuDto AddMenuItem(MenuCreateDto menuCreateDto, string relativeImageUrl, string baseUrl);

        // Update an existing menu item
        bool UpdateMenuItem(int id, MenuUpdateDto menuUpdateDto, string? relativeImageUrl);

        // Delete a menu item by ID
        bool DeleteMenuItem(int id);
    }
}
