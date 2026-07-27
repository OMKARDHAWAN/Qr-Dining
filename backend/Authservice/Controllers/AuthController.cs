using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
namespace backend.Controllers
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
        /// <summary>
        /// Customer Login / Auto-Registration.
        /// Receives Username, Email, and Mobile Number.
        /// </summary>
        [HttpPost("customer-login")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustomerLoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.CustomerLoginAsync(request);

            // If the customer registration fails due to duplicate username/email taken by staff
            if (!result.IsRegistered && !string.IsNullOrEmpty(request.Username) && !string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { message = result.Message });
            }
            // If OTP verification was attempted and failed
            if (result.IsRegistered && result.OtpSent && string.IsNullOrEmpty(result.Token) && !string.IsNullOrEmpty(request.Otp))
            {
                return BadRequest(new { message = result.Message });
            }
            return Ok(result);
        }
        /// <summary>
        /// Staff Login (for Admin and Chef).
        /// Receives Username and Password.
        /// </summary>
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
                // To prevent user enumeration, we return a generic error message
                return Unauthorized(new { message = "Invalid Username or Password." });
            }
            return Ok(result);
        }
        /// <summary>
        /// Admin Action: Create a Chef account.
        /// Requires Admin role JWT to access.
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpPost("create-chef")]
        public async Task<IActionResult> CreateChef([FromBody] ChefRegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.CreateChefAsync(request);
            if (result == null)
            {
                return BadRequest(new { message = "Username or Email is already registered." });
            }
            return Ok(new { message = "Chef account created successfully.", chefDetails = result });
        }
        /// <summary>
        /// User Profile verification.
        /// Requires an authenticated JWT token.
        /// Extracts user profile directly from claims.
        /// </summary>
        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            // The claims are extracted automatically by ASP.NET Core from the Bearer Token
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
        /// <summary>
        /// Logout Endpoint.
        /// Requires an authenticated JWT token.
        /// Stateless JWTs cannot be easily invalidated on the server-side without a database blacklist.
        /// We return a success message instructing the client to delete the token from local storage.
        /// </summary>
        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // In cookie-based auth, we would call HttpContext.SignOutAsync() or clear cookies.
            // Since JWT is stateless, the server does not hold session state.
            // We return a message telling React to destroy the token from local storage / memory.
            return Ok(new { message = "Logged out successfully. Please delete the token from the client-side storage." });
        }
    }
}
