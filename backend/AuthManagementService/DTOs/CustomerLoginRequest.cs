using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CustomerLoginRequest
    {

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; } = string.Empty;


     
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mobile Number is required")]
        [Phone(ErrorMessage = "Invalid Mobile Number")]
        public string MobileNumber { get; set; } = string.Empty;
    }
}
