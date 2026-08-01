using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthManagementService.DTOs;
using AuthManagementService.Services;

namespace AuthManagementService.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // ====================================================
        // AUTHENTICATION ENDPOINTS
        // ====================================================

        [HttpPost("customer-login")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustomerLoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.CustomerLoginAsync(request);

            if (!result.IsRegistered && !string.IsNullOrEmpty(request.Username) && !string.IsNullOrEmpty(request.Email))
            {
                if (result.OtpSent)
                {
                    return Ok(result);
                }
                return BadRequest(new { message = result.Message });
            }

            if (result.IsRegistered && result.OtpSent && string.IsNullOrEmpty(result.Token) && !string.IsNullOrEmpty(request.Otp))
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(result);
        }

        [HttpPost("staff-login")]
        public async Task<IActionResult> StaffLogin([FromBody] StaffLoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.StaffLoginAsync(request);
            if (result == null)
            {
                return Unauthorized(new { message = "Invalid Username or Password." });
            }

            return Ok(result);
        }

        [Authorize(Roles = "Admin,Chef")]
        [HttpPost("create-chef")]
        public async Task<IActionResult> CreateChef([FromBody] ChefRegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Password is required for new registration." });
            }

            var result = await _authService.CreateChefAsync(request);
            if (result == null)
            {
                return BadRequest(new { message = "Username or Email is already registered." });
            }

            return Ok(new { message = "Chef account created successfully.", chefDetails = result });
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var mobileNumber = User.FindFirst("MobileNumber")?.Value;

            return Ok(new
            {
                Id = userId,
                Username = username,
                Email = email,
                Role = role,
                MobileNumber = mobileNumber
            });
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logged out successfully. Please delete the token from the client-side storage." });
        }

        // ====================================================
        // STAFF CRUD ENDPOINTS (Admin Only)
        // ====================================================

        [Authorize(Roles = "Admin,Chef")]
        [HttpGet("staff")]
        public async Task<IActionResult> GetAllStaff()
        {
            var list = await _authService.GetAllStaffAsync();
            return Ok(list);
        }

        [Authorize(Roles = "Admin,Chef")]
        [HttpGet("staff/{id}")]
        public async Task<IActionResult> GetStaffById(int id)
        {
            var item = await _authService.GetStaffByIdAsync(id);
            if (item == null)
            {
                return NotFound(new { message = "Staff member not found." });
            }
            return Ok(item);
        }

        [Authorize(Roles = "Admin,Chef")]
        [HttpPut("staff/{id}")]
        public async Task<IActionResult> UpdateStaff(int id, [FromBody] ChefRegisterRequest request)
        {
            var success = await _authService.UpdateStaffAsync(id, request);
            if (!success)
            {
                return NotFound(new { message = "Staff member not found or update failed." });
            }
            return Ok(new { message = "Staff member updated successfully." });
        }

        [Authorize(Roles = "Admin,Chef")]
        [HttpDelete("staff/{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var success = await _authService.DeleteStaffAsync(id);
            if (!success)
            {
                return NotFound(new { message = "Staff member not found or deletion failed." });
            }
            return Ok(new { message = "Staff member deleted successfully." });
        }

        // ====================================================
        // CUSTOMER CRUD ENDPOINTS (Admin Only)
        // ====================================================

        [Authorize(Roles = "Admin")]
        [HttpGet("customers")]
        public async Task<IActionResult> GetAllCustomers()
        {
            var list = await _authService.GetAllCustomersAsync();
            return Ok(list);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("customers/{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var item = await _authService.GetCustomerByIdAsync(id);
            if (item == null)
            {
                return NotFound(new { message = "Customer not found." });
            }
            return Ok(item);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("customers/{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CustomerLoginRequest request)
        {
            var success = await _authService.UpdateCustomerAsync(id, request);
            if (!success)
            {
                return NotFound(new { message = "Customer not found or update failed." });
            }
            return Ok(new { message = "Customer updated successfully." });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("customers/{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var success = await _authService.DeleteCustomerAsync(id);
            if (!success)
            {
                return NotFound(new { message = "Customer not found or deletion failed." });
            }
            return Ok(new { message = "Customer deleted successfully." });
        }
    }
}
