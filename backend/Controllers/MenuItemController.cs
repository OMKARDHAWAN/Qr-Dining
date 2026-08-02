using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/menuitems")]
    public class MenuItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MenuItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _context.MenuItems.Include(m => m.Category).ToListAsync();
            var dtos = items.Select(m => new
            {
                m.Id,
                m.ItemName,
                m.Price,
                m.Description,
                m.Status,
                m.ImageUrl,
                m.CategoryId,
                CategoryName = m.Category?.CategoryName ?? "General"
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.MenuItems.Include(m => m.Category).FirstOrDefaultAsync(m => m.Id == id);
            if (item == null) return NotFound();
            return Ok(new
            {
                item.Id,
                item.ItemName,
                item.Price,
                item.Description,
                item.Status,
                item.ImageUrl,
                item.CategoryId,
                CategoryName = item.Category?.CategoryName ?? "General"
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MenuItem item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _context.MenuItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] MenuItem item)
        {
            var existing = await _context.MenuItems.FindAsync(id);
            if (existing == null) return NotFound();

            existing.ItemName = item.ItemName;
            existing.Price = item.Price;
            existing.Description = item.Description;
            existing.Status = item.Status;
            existing.ImageUrl = item.ImageUrl;
            existing.CategoryId = item.CategoryId;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.MenuItems.FindAsync(id);
            if (item == null) return NotFound();
            _context.MenuItems.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Menu item deleted successfully" });
        }
    }

    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }
    }
}
