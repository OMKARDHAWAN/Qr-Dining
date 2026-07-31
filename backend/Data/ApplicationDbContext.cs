using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
        public class ApplicationDbContext : DbContext
        {
            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                : base(options)
            {
            }
            public DbSet<Admin> Admins { get; set; }
            public DbSet<Inventory> Inventories { get; set; }
            public DbSet<Offer> Offers { get; set; }
            public DbSet<UserInteraction> UserInteractions { get; set; }
        }
    }

