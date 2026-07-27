using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MenuService.Data;
using MenuService.Models;
using MenuService.Repositories.Interfaces;

namespace MenuService.Repositories.Implementations
{
    // Menu repository implementation using EF Core
    public class MenuRepository : IMenuRepository
    {
        private readonly ApplicationDbContext dbContext;

        // Constructor injection for DbContext
        public MenuRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Fetch all menu items including category details
        public IEnumerable<MenuItemList> GetAllMenuItems()
        {
            return dbContext.MenuItemLists.Include(item => item.Category).ToList();
        }

        // Fetch single menu item by ID including category details
        public MenuItemList? GetMenuItemById(int id)
        {
            return dbContext.MenuItemLists
                            .Include(item => item.Category)
                            .FirstOrDefault(item => item.Id == id);
        }

        // Save a new menu item in database
        public MenuItemList AddMenuItem(MenuItemList menuItem)
        {
            dbContext.MenuItemLists.Add(menuItem);
            dbContext.SaveChanges();
            return menuItem;
        }

        // Update an existing menu item in database
        public void UpdateMenuItem(MenuItemList menuItem)
        {
            // Entity Framework tracks changes, so we just call SaveChanges
            dbContext.SaveChanges();
        }

        // Delete a menu item from database
        public void DeleteMenuItem(MenuItemList menuItem)
        {
            dbContext.MenuItemLists.Remove(menuItem);
            dbContext.SaveChanges();
        }
    }
}
