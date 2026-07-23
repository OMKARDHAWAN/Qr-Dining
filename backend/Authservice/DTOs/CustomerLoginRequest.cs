using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace backend.DTOs
{
    public class CustomerLoginRequest
    {
        [Required(ErrorMessage = "Mobile Number is required")]
        [Phone(ErrorMessage = "Invalid Mobile Number")]
        public string MobileNumber { get; set; } = string.Empty;
        // Username and Email are required ONLY during new customer registration

        [JsonPropertyName("username")]
        [JsonProperty("username")]
        public string? Username { get; set; }
        [EmailAddress(ErrorMessage = "Invalid Email Address")]

        [JsonPropertyName("email")]
        [JsonProperty("email")]
        public string? Email { get; set; }
        // Optional OTP code for OTP verification step


        [JsonPropertyName("otp")]
        [JsonProperty("otp")]
        public string? Otp { get; set; }
    }
}
