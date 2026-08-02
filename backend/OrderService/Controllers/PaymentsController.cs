using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("process")]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequestDto dto)
        {
            if (dto == null || dto.Amount <= 0)
            {
                return BadRequest(new { success = false, message = "Invalid payment request." });
            }

            var txnId = "TXN" + DateTime.UtcNow.Ticks.ToString()[^8..];
            if (dto.OrderId > 0)
            {
                var order = await _context.Orders.FindAsync(dto.OrderId);
                if (order != null)
                {
                    order.PaymentStatus = "Paid";
                    order.TransactionId = txnId;
                    order.PaymentMethod = dto.PaymentMethod;
                    await _context.SaveChangesAsync();
                }
            }

            return Ok(new PaymentResponseDto
            {
                Success = true,
                Message = "Payment processed successfully.",
                TransactionId = txnId
            });
        }
    }
}
