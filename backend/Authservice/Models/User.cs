using System;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        
        public string Username { get; set; } = string.Empty;
        
        public string Email { get; set; } = string.Empty;
        
        public string MobileNumber { get; set; } = string.Empty;
        
        // Stored as a hashed value for Staff (Admin/Chef). For Customers, if they login passwordless, this could be null/empty.
        public string? PasswordHash { get; set; }
        
        // Roles can be "Admin", "Chef", or "User" (Customer)
        public string Role { get; set; } = "User";
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
