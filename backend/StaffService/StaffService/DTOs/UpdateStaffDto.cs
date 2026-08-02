using Microsoft.AspNetCore.Http;

namespace StaffService.DTOs
{
    public class UpdateStaffDto
    {
        public string Name { get; set; }

        public string Role { get; set; }

        public string Department { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Status { get; set; }

        public IFormFile? Image { get; set; }
    }
}
