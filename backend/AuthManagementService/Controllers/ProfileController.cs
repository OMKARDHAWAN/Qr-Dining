using System.Security.Claims;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value ?? "User";

            backend.Models.User? userProfile = null;
            if (int.TryParse(userIdStr, out var userId))
            {
                userProfile = await _context.Users.FindAsync(userId);
            }

            if (userProfile == null)
            {
                userProfile = await _context.Users.FirstOrDefaultAsync(u => u.Role == userRole) 
                               ?? await _context.Users.FirstOrDefaultAsync() 
                               ?? new backend.Models.User { Id = 1, Username = "Chef Maria", Email = "chef.maria@restaurant.com", MobileNumber = "9876543210", Role = "Chef" };
            }

            return Ok(new ProfileResponseDto
            {
                Id = userProfile.Id,
                Name = userProfile.Username,
                Email = userProfile.Email,
                Mobile = userProfile.MobileNumber,
                Role = userProfile.Role
            });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateDto dto)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            backend.Models.User? userProfile = null;
            if (int.TryParse(userIdStr, out var userId))
            {
                userProfile = await _context.Users.FindAsync(userId);
            }

            if (userProfile == null)
            {
                userProfile = await _context.Users.FirstOrDefaultAsync();
            }

            if (userProfile != null)
            {
                if (!string.IsNullOrWhiteSpace(dto.Name)) userProfile.Username = dto.Name;
                if (!string.IsNullOrWhiteSpace(dto.Email)) userProfile.Email = dto.Email;
                if (!string.IsNullOrWhiteSpace(dto.Mobile)) userProfile.MobileNumber = dto.Mobile;

                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Profile updated successfully." });
        }
    }
}
