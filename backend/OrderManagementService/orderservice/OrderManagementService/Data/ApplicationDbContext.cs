using Microsoft.EntityFrameworkCore;
using OrderManagementService.Models;

namespace OrderManagementService.Data
{
    // database context class
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Order> Orders { get; set; }
    }
}
