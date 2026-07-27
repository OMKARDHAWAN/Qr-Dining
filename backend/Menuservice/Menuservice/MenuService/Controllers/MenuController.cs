using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MenuService.DTOs;
using MenuService.Services.Interfaces;

namespace MenuService.Controllers
{
    [ApiController]
    [Route("api/menu")]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService menuService;
        private readonly IWebHostEnvironment webHostEnvironment;

        // Constructor injection for MenuService and IWebHostEnvironment
        public MenuController(IMenuService menuService, IWebHostEnvironment webHostEnvironment)
        {
            this.menuService = menuService;
            this.webHostEnvironment = webHostEnvironment;
        }

        // POST /api/menu
        [HttpPost]
        public IActionResult CreateMenu([FromForm] MenuCreateDto menuCreateDto)
        {
            try
            {
                if (menuCreateDto == null)
                {
                    return BadRequest("Invalid menu item data.");
                }

                string relativeImageUrl = "";

                // Save uploaded image inside wwwroot/images folder if provided
                if (menuCreateDto.Image != null && menuCreateDto.Image.Length > 0)
                {
                    string webRoot = webHostEnvironment.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                    string uploadsFolder = Path.Combine(webRoot, "images");

                    // Check if folder exists, if not create it automatically
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique file name
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + menuCreateDto.Image.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        menuCreateDto.Image.CopyTo(fileStream);
                    }

                    // Save relative image path
                    relativeImageUrl = "/images/" + uniqueFileName;
                }

                // Generate base URL from HTTP Request
                string baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                
                // Save menu item and resolve category inside Service
                var result = menuService.AddMenuItem(menuCreateDto, relativeImageUrl, baseUrl);

                return CreatedAtAction(nameof(GetMenuItemById), new { id = result.Id }, result);
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

        // PUT /api/menu/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateMenu(int id, [FromForm] MenuUpdateDto menuUpdateDto)
        {
            try
            {
                if (id <= 0 || menuUpdateDto == null)
                {
                    return BadRequest("Invalid ID or data.");
                }

                string? relativeImageUrl = null;

                // Save uploaded image inside wwwroot/images folder if new image is provided
                if (menuUpdateDto.Image != null && menuUpdateDto.Image.Length > 0)
                {
                    string webRoot = webHostEnvironment.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                    string uploadsFolder = Path.Combine(webRoot, "images");

                    // Check if folder exists, if not create it automatically
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate unique filename
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + menuUpdateDto.Image.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        menuUpdateDto.Image.CopyTo(fileStream);
                    }

                    relativeImageUrl = "/images/" + uniqueFileName;
                }

                var success = menuService.UpdateMenuItem(id, menuUpdateDto, relativeImageUrl);
                if (!success)
                {
                    return NotFound("Menu item not found.");
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

        // DELETE /api/menu/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteMenu(int id)
        {
            try
            {
                var success = menuService.DeleteMenuItem(id);
                if (!success)
                {
                    return NotFound("Menu item not found.");
                }

                return Ok("Deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }

        // GET /api/menu/getallmenu
        [HttpGet("getallmenu")]
        public IActionResult GetAllMenu()
        {
            try
            {
                // Generate base URL from HTTP Context to build complete URL path
                string baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                var result = menuService.GetAllMenuItems(baseUrl);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }

        // GET /api/menu/{id}
        [HttpGet("{id}")]
        public IActionResult GetMenuItemById(int id)
        {
            try
            {
                string baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                var result = menuService.GetMenuItemById(id, baseUrl);
                if (result == null)
                {
                    return NotFound("Menu item not found.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }
    }
}
