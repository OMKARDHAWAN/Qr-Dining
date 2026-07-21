using System;
using System.Collections.Generic;
using MenuService.DTOs;
using MenuService.Models;
using MenuService.Repositories.Interfaces;
using MenuService.Services.Interfaces;

namespace MenuService.Services.Implementations
{
    // Menu service implementation handling dynamic category mapping, validations, and mapping full server paths
    public class MenuService : IMenuService
    {
        private readonly IMenuRepository menuRepository;
        private readonly ICategoryRepository categoryRepository;

        // Constructor injection for both repositories
        public MenuService(IMenuRepository menuRepository, ICategoryRepository categoryRepository)
        {
            this.menuRepository = menuRepository;
            this.categoryRepository = categoryRepository;
        }

        // Fetch all menu items and construct complete absolute image URL
        public IEnumerable<MenuDto> GetAllMenuItems(string baseUrl)
        {
            var itemsList = menuRepository.GetAllMenuItems();
            var dtoList = new List<MenuDto>();

            foreach (var item in itemsList)
            {
                var dto = new MenuDto();
                dto.Id = item.Id;
                dto.CategoryId = item.CategoryId;
                dto.ItemName = item.ItemName;
                dto.Price = item.Price;
                dto.Description = item.Description;
                dto.Status = item.Status;

                // Build complete ImageUrl using Request BaseUrl prefix
                if (!string.IsNullOrEmpty(item.ImageUrl))
                {
                    dto.ImageUrl = baseUrl + item.ImageUrl;
                }

                if (item.Category != null)
                {
                    dto.CategoryName = item.Category.CategoryName;
                }
                
                dtoList.Add(dto);
            }

            return dtoList;
        }

        // Fetch single menu item by ID
        public MenuDto? GetMenuItemById(int id, string baseUrl)
        {
            var item = menuRepository.GetMenuItemById(id);
            if (item == null)
            {
                return null;
            }

            var dto = new MenuDto();
            dto.Id = item.Id;
            dto.CategoryId = item.CategoryId;
            dto.ItemName = item.ItemName;
            dto.Price = item.Price;
            dto.Description = item.Description;
            dto.Status = item.Status;

            if (!string.IsNullOrEmpty(item.ImageUrl))
            {
                dto.ImageUrl = baseUrl + item.ImageUrl;
            }

            if (item.Category != null)
            {
                dto.CategoryName = item.Category.CategoryName;
            }

            return dto;
        }

        // Add a new menu item, dynamically resolving or creating the category
        public MenuDto AddMenuItem(MenuCreateDto menuCreateDto, string relativeImageUrl, string baseUrl)
        {
            // Basic validation
            if (string.IsNullOrWhiteSpace(menuCreateDto.ItemName))
            {
                throw new ArgumentException("ItemName should not be empty.");
            }

            if (menuCreateDto.Price <= 0)
            {
                throw new ArgumentException("Price should be greater than zero.");
            }

            if (string.IsNullOrWhiteSpace(menuCreateDto.CategoryName))
            {
                throw new ArgumentException("CategoryName should not be empty.");
            }

            // Search the Category table using CategoryName (case-insensitive)
            var category = categoryRepository.GetCategoryByName(menuCreateDto.CategoryName);

            // If it does not exist, automatically create a new category
            if (category == null)
            {
                var newCat = new Category();
                newCat.CategoryName = menuCreateDto.CategoryName.Trim();
                
                category = categoryRepository.AddCategory(newCat);
            }

            // Create and save the MenuItemList entity
            var item = new MenuItemList();
            item.CategoryId = category.CategoryId;
            item.ItemName = menuCreateDto.ItemName.Trim();
            item.Price = menuCreateDto.Price;
            item.Description = menuCreateDto.Description;
            item.Status = menuCreateDto.Status;
            item.ImageUrl = relativeImageUrl;

            var savedItem = menuRepository.AddMenuItem(item);

            // Return saved DTO details
            var savedDto = new MenuDto();
            savedDto.Id = savedItem.Id;
            savedDto.CategoryId = savedItem.CategoryId;
            savedDto.CategoryName = category.CategoryName;
            savedDto.ItemName = savedItem.ItemName;
            savedDto.Price = savedItem.Price;
            savedDto.Description = savedItem.Description;
            savedDto.Status = savedItem.Status;
            
            if (!string.IsNullOrEmpty(savedItem.ImageUrl))
            {
                savedDto.ImageUrl = baseUrl + savedItem.ImageUrl;
            }

            return savedDto;
        }

        // Update an existing menu item
        public bool UpdateMenuItem(int id, MenuUpdateDto menuUpdateDto, string? relativeImageUrl)
        {
            // Basic validation
            if (string.IsNullOrWhiteSpace(menuUpdateDto.ItemName))
            {
                throw new ArgumentException("ItemName should not be empty.");
            }

            if (menuUpdateDto.Price <= 0)
            {
                throw new ArgumentException("Price should be greater than zero.");
            }

            if (string.IsNullOrWhiteSpace(menuUpdateDto.CategoryName))
            {
                throw new ArgumentException("CategoryName should not be empty.");
            }

            var existingItem = menuRepository.GetMenuItemById(id);
            if (existingItem == null)
            {
                return false;
            }

            // Search the Category table using CategoryName (case-insensitive)
            var category = categoryRepository.GetCategoryByName(menuUpdateDto.CategoryName);

            // If it does not exist, automatically create a new category
            if (category == null)
            {
                var newCat = new Category();
                newCat.CategoryName = menuUpdateDto.CategoryName.Trim();
                
                category = categoryRepository.AddCategory(newCat);
            }

            // Update item fields
            existingItem.CategoryId = category.CategoryId;
            existingItem.ItemName = menuUpdateDto.ItemName.Trim();
            existingItem.Price = menuUpdateDto.Price;
            existingItem.Description = menuUpdateDto.Description;
            existingItem.Status = menuUpdateDto.Status;

            // If a new relativeImageUrl is provided, update it; otherwise keep existing
            if (relativeImageUrl != null)
            {
                existingItem.ImageUrl = relativeImageUrl;
            }

            menuRepository.UpdateMenuItem(existingItem);
            return true;
        }

        // Delete a menu item by ID
        public bool DeleteMenuItem(int id)
        {
            var existingItem = menuRepository.GetMenuItemById(id);
            if (existingItem == null)
            {
                return false;
            }

            menuRepository.DeleteMenuItem(existingItem);
            return true;
        }
    }
}
