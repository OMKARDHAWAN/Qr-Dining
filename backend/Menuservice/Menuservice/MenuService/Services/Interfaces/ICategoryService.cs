using System.Collections.Generic;
using MenuService.DTOs;

namespace MenuService.Services.Interfaces
{
    // Interface for Category service business logic
    public interface ICategoryService
    {
        // Get all categories mapped to DTO
        IEnumerable<CategoryDto> GetAllCategories();

        // Get single category by ID
        CategoryDto? GetCategoryById(int id);

        // Add a new category with duplicate verification
        CategoryDto AddCategory(CategoryCreateDto categoryDto);

        // Update a category name
        bool UpdateCategory(int id, CategoryUpdateDto categoryDto);

        // Delete a category
        bool DeleteCategory(int id);
    }
}
