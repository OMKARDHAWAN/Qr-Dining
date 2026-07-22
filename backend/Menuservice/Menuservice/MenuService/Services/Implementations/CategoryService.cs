using System;
using System.Collections.Generic;
using MenuService.DTOs;
using MenuService.Models;
using MenuService.Repositories.Interfaces;
using MenuService.Services.Interfaces;

namespace MenuService.Services.Implementations
{
    // Category service implementation handling business validation and mappings
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;

        // Constructor injection for category repository
        public CategoryService(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        // Fetch all categories and map to DTOs manually
        public IEnumerable<CategoryDto> GetAllCategories()
        {
            var categories = categoryRepository.GetAllCategories();
            var dtoList = new List<CategoryDto>();

            foreach (var cat in categories)
            {
                var dto = new CategoryDto();
                dto.CategoryId = cat.CategoryId;
                dto.CategoryName = cat.CategoryName;
                
                dtoList.Add(dto);
            }

            return dtoList;
        }

        // Fetch single category by ID and map to DTO
        public CategoryDto? GetCategoryById(int id)
        {
            var cat = categoryRepository.GetCategoryById(id);
            if (cat == null)
            {
                return null;
            }

            var dto = new CategoryDto();
            dto.CategoryId = cat.CategoryId;
            dto.CategoryName = cat.CategoryName;

            return dto;
        }

        // Add a new category with duplicate verification (case-insensitive check)
        public CategoryDto AddCategory(CategoryCreateDto categoryDto)
        {
            // Basic validation
            if (string.IsNullOrWhiteSpace(categoryDto.CategoryName))
            {
                throw new ArgumentException("CategoryName should not be empty.");
            }

            // Check whether the category already exists (case-insensitive)
            var existingCategory = categoryRepository.GetCategoryByName(categoryDto.CategoryName);
            if (existingCategory != null)
            {
                // If it already exists, return the existing category details
                var existingDto = new CategoryDto();
                existingDto.CategoryId = existingCategory.CategoryId;
                existingDto.CategoryName = existingCategory.CategoryName;

                return existingDto;
            }

            // If it does not exist, create a new category
            var cat = new Category();
            cat.CategoryName = categoryDto.CategoryName.Trim();

            var savedCat = categoryRepository.AddCategory(cat);

            var savedDto = new CategoryDto();
            savedDto.CategoryId = savedCat.CategoryId;
            savedDto.CategoryName = savedCat.CategoryName;

            return savedDto;
        }

        // Update an existing category name
        public bool UpdateCategory(int id, CategoryUpdateDto categoryDto)
        {
            // Basic validation
            if (string.IsNullOrWhiteSpace(categoryDto.CategoryName))
            {
                throw new ArgumentException("CategoryName should not be empty.");
            }

            var existingCat = categoryRepository.GetCategoryById(id);
            if (existingCat == null)
            {
                return false;
            }

            existingCat.CategoryName = categoryDto.CategoryName.Trim();
            categoryRepository.UpdateCategory(existingCat);

            return true;
        }

        // Delete a category
        public bool DeleteCategory(int id)
        {
            var existingCat = categoryRepository.GetCategoryById(id);
            if (existingCat == null)
            {
                return false;
            }

            categoryRepository.DeleteCategory(existingCat);
            return true;
        }
    }
}
