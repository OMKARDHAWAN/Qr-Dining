using System.Collections.Generic;
using System.Linq;
using MenuService.Data;
using MenuService.Models;
using MenuService.Repositories.Interfaces;

namespace MenuService.Repositories.Implementations
{
    // Category repository implementation using EF Core
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext dbContext;

        // Constructor injection for DbContext
        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Get all categories from database
        public IEnumerable<Category> GetAllCategories()
        {
            return dbContext.Categories.ToList();
        }

        // Get category by ID from database
        public Category? GetCategoryById(int id)
        {
            return dbContext.Categories.Find(id);
        }

        // Get category by name (case-insensitive check)
        public Category? GetCategoryByName(string name)
        {
            return dbContext.Categories.FirstOrDefault(c => c.CategoryName.ToLower() == name.ToLower());
        }

        // Save a new category to database
        public Category AddCategory(Category category)
        {
            dbContext.Categories.Add(category);
            dbContext.SaveChanges();
            return category;
        }

        // Update an existing category
        public void UpdateCategory(Category category)
        {
            // Entity framework tracks changes, so we just call SaveChanges
            dbContext.SaveChanges();
        }

        // Delete a category from database
        public void DeleteCategory(Category category)
        {
            dbContext.Categories.Remove(category);
            dbContext.SaveChanges();
        }
    }
}
