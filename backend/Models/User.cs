using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(15)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(255)]
        public string? PasswordHash { get; set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}
