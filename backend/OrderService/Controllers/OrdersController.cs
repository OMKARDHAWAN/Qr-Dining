using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _context.Orders.ToListAsync();
            var dtos = orders.Select(MapToDto).ToList();
            return Ok(dtos);
        }

        // GET: api/orders/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound(new { message = $"Order with ID {id} was not found." });
            }
            return Ok(MapToDto(order));
        }

        // POST: api/orders
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.OrderItems))
            {
                return BadRequest(new { message = "Invalid order data." });
            }

            var order = new Order
            {
                TableId = dto.TableId,
                OrderItems = dto.OrderItems,
                Price = dto.Price,
                Notes = dto.Notes,
                Status = dto.Status ?? "Pending",
                Quantity = dto.Quantity > 0 ? dto.Quantity : 1,
                Duration = string.IsNullOrWhiteSpace(dto.Duration) ? "15 mins" : dto.Duration,
                PaymentStatus = dto.PaymentStatus ?? "Pending",
                TransactionId = dto.TransactionId ?? Guid.NewGuid().ToString("N")[..10].ToUpperInvariant(),
                PaymentMethod = dto.PaymentMethod ?? "UPI"
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return StatusCode(201, MapToDto(order));
        }

        // PUT: api/orders/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateOrderDto dto)
        {
            var existing = await _context.Orders.FindAsync(id);
            if (existing == null)
            {
                return NotFound(new { message = $"Order with ID {id} was not found." });
            }

            if (dto.TableId > 0) existing.TableId = dto.TableId;
            if (!string.IsNullOrWhiteSpace(dto.OrderItems)) existing.OrderItems = dto.OrderItems;
            if (dto.Price > 0) existing.Price = dto.Price;
            if (dto.Notes != null) existing.Notes = dto.Notes;
            if (!string.IsNullOrWhiteSpace(dto.Status)) existing.Status = dto.Status;
            if (dto.Quantity > 0) existing.Quantity = dto.Quantity;
            if (!string.IsNullOrWhiteSpace(dto.Duration)) existing.Duration = dto.Duration;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Order updated successfully", order = MapToDto(existing) });
        }

        // DELETE: api/orders/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _context.Orders.FindAsync(id);
            if (existing == null)
            {
                return NotFound(new { message = $"Order with ID {id} was not found." });
            }

            _context.Orders.Remove(existing);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Order deleted successfully" });
        }

        private static OrderResponseDto MapToDto(Order order) => new()
        {
            Id = order.Id,
            TableId = order.TableId,
            OrderItems = order.OrderItems,
            Price = order.Price,
            Notes = order.Notes,
            Status = order.Status,
            Quantity = order.Quantity,
            Duration = order.Duration,
            PaymentStatus = order.PaymentStatus,
            TransactionId = order.TransactionId,
            PaymentMethod = order.PaymentMethod
        };
    }
}
