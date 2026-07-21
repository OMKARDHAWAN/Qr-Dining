using System.Collections.Generic;
using MenuService.Models;

namespace MenuService.Repositories.Interfaces
{
    // Interface for database operations on Category table
    public interface ICategoryRepository
    {
        // Get all categories
        IEnumerable<Category> GetAllCategories();

        // Find category by ID
        Category? GetCategoryById(int id);

        // Find category by name (useful for uniqueness check)
        Category? GetCategoryByName(string name);

        // Save a new category
        Category AddCategory(Category category);

        // Update an existing category
        void UpdateCategory(Category category);

        // Delete a category
        void DeleteCategory(Category category);
    }
}
