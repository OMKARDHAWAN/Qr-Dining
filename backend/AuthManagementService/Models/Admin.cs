using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
        public class Admin
        {
            [Key]
            public int Admin_Id { get; set; }

            [Required]
            [StringLength(100)]
            public string Admin_Name { get; set; } = string.Empty;

            [Required]
            [StringLength(255)]
            public string Password { get; set; } = string.Empty;
        }
    }

