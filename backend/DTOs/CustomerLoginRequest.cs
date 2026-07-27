using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CustomerLoginRequest
    {

        public string? Username { get; set; } = string.Empty;


     
        public string? Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mobile Number is required")]
        [Phone(ErrorMessage = "Invalid Mobile Number")]
        public string MobileNumber { get; set; } = string.Empty;
    }
}
