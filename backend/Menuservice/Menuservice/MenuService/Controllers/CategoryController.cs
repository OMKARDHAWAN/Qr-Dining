using System;
using Microsoft.AspNetCore.Mvc;
using MenuService.DTOs;
using MenuService.Services.Interfaces;

namespace MenuService.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        // Constructor injection for CategoryService
        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        // POST /api/category/addcategory
        [HttpPost("addcategory")]
        public IActionResult AddCategory([FromBody] CategoryCreateDto categoryDto)
        {
            try
            {
                if (categoryDto == null)
                {
                    return BadRequest("Invalid category data.");
                }

                var result = categoryService.AddCategory(categoryDto);
                
                // Return 201 Created with the location of the resource
                return CreatedAtAction(nameof(GetCategoryById), new { id = result.CategoryId }, result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }

        // GET /api/category/getallcategories
        [HttpGet("getallcategories")]
        public IActionResult GetAllCategories()
        {
            try
            {
                var result = categoryService.GetAllCategories();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }

        // GET /api/category/{id}
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            try
            {
                var result = categoryService.GetCategoryById(id);
                if (result == null)
                {
                    return NotFound("Category not found.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }

        // PUT /api/category/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] CategoryUpdateDto categoryDto)
        {
            try
            {
                if (categoryDto == null)
                {
                    return BadRequest("Invalid category data.");
                }

                var success = categoryService.UpdateCategory(id, categoryDto);
                if (!success)
                {
                    return NotFound("Category not found.");
                }

                return Ok("Updated successfully.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }

        // DELETE /api/category/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                var success = categoryService.DeleteCategory(id);
                if (!success)
                {
                    return NotFound("Category not found.");
                }
                return Ok("Deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }
    }
}
