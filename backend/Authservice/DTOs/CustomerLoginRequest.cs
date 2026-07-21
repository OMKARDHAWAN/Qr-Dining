using System.ComponentModel.DataAnnotations;
namespace backend.DTOs
{
    public class CustomerLoginRequest
    {
        [Required(ErrorMessage = "Mobile Number is required")]
        [Phone(ErrorMessage = "Invalid Mobile Number")]
        public string MobileNumber { get; set; } = string.Empty;
        // Username and Email are required ONLY during new customer registration
        public string? Username { get; set; }
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }
        // Optional OTP code for OTP verification step
        public string? Otp { get; set; }
    }
}
