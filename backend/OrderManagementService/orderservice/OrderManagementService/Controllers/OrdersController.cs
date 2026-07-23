using Microsoft.AspNetCore.Mvc;
using OrderManagementService.DTOs;
using OrderManagementService.Interfaces;
using OrderManagementService.Models;

namespace OrderManagementService.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repository;

        public OrdersController(IOrderRepository repository)
        {
            _repository = repository;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // get all orders
            var orders = await _repository.GetAll();
            
            // map to response dto list
            var response = new List<OrderResponseDto>();
            foreach (var order in orders)
            {
                response.Add(MapToDto(order));
            }

            return Ok(response);
        }

        // GET: api/orders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            // get order by id
            var order = await _repository.GetById(id);
            if (order == null)
            {
                return NotFound($"Order with ID {id} was not found.");
            }

            // map and return data
            return Ok(MapToDto(order));
        }

        // POST: api/orders
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
        {
            // validate request
            if (dto == null)
            {
                return BadRequest("Order data is required.");
            }

            if (string.IsNullOrEmpty(dto.OrderDetails))
            {
                return BadRequest("OrderDetails cannot be empty.");
            }

            if (dto.Price <= 0)
            {
                return BadRequest("Price must be greater than 0.");
            }

            if (dto.Quantity <= 0)
            {
                return BadRequest("Quantity must be greater than 0.");
            }

            if (string.IsNullOrEmpty(dto.Status))
            {
                return BadRequest("Status cannot be empty.");
            }

            // map dto to order entity
            var order = new Order
            {
                OrderDetails = dto.OrderDetails,
                Price = dto.Price,
                Duration = dto.Duration,
                Status = dto.Status,
                TableId = dto.TableId,
                Quantity = dto.Quantity
            };

            // create order and save
            var createdOrder = await _repository.Create(order);
            await _repository.Save();

            // map to response dto
            var responseDto = MapToDto(createdOrder);

            return CreatedAtAction(nameof(GetById), new { id = responseDto.Id }, responseDto);
        }

        // PUT: api/orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateOrderDto dto)
        {
            // validate request
            if (dto == null)
            {
                return BadRequest("Order data is required.");
            }

            if (string.IsNullOrEmpty(dto.OrderDetails))
            {
                return BadRequest("OrderDetails cannot be empty.");
            }

            if (dto.Price <= 0)
            {
                return BadRequest("Price must be greater than 0.");
            }

            if (dto.Quantity <= 0)
            {
                return BadRequest("Quantity must be greater than 0.");
            }

            if (string.IsNullOrEmpty(dto.Status))
            {
                return BadRequest("Status cannot be empty.");
            }

            // check if order exists
            var existingOrder = await _repository.GetById(id);
            if (existingOrder == null)
            {
                return NotFound($"Order with ID {id} was not found.");
            }

            // update existing entity fields
            existingOrder.OrderDetails = dto.OrderDetails;
            existingOrder.Price = dto.Price;
            existingOrder.Duration = dto.Duration;
            existingOrder.Status = dto.Status;
            existingOrder.TableId = dto.TableId;
            existingOrder.Quantity = dto.Quantity;

            // save update
            await _repository.Update(existingOrder);
            await _repository.Save();

            return Ok(new { message = "Order updated successfully" });
        }

        // DELETE: api/orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // check if order exists
            var existingOrder = await _repository.GetById(id);
            if (existingOrder == null)
            {
                return NotFound($"Order with ID {id} was not found.");
            }

            // delete order and save
            await _repository.Delete(id);
            await _repository.Save();

            return Ok(new { message = "Order deleted successfully" });
        }

        // manual mapping helper
        private OrderResponseDto MapToDto(Order order)
        {
            return new OrderResponseDto
            {
                Id = order.Id,
                OrderDetails = order.OrderDetails,
                Price = order.Price,
                Duration = order.Duration,
                Status = order.Status,
                TableId = order.TableId,
                Quantity = order.Quantity
            };
        }
    }
}
