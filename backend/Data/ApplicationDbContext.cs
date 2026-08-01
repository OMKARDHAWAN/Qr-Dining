using backend.Models;
using backend.Helpers;
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
            public DbSet<User> Users { get; set; }
            public DbSet<Inventory> Inventories { get; set; }
            public DbSet<Offer> Offers { get; set; }
            public DbSet<UserInteraction> UserInteractions { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<User>(entity =>
                {
                    entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                    entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                    entity.Property(e => e.MobileNumber).IsRequired().HasMaxLength(15);
                    entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
                    entity.Property(e => e.PasswordHash).HasMaxLength(255);
                });

                modelBuilder.Entity<User>().HasData(
                    new User { Id = 1, Username = "admin", Email = "admin@restaurant.com", MobileNumber = "1112223333", PasswordHash = PasswordHelper.HashPassword("AdminPassword123"), Role = "Admin", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                    new User { Id = 2, Username = "chef_maria", Email = "chef.maria@restaurant.com", MobileNumber = "4445556666", PasswordHash = PasswordHelper.HashPassword("ChefPassword123"), Role = "Chef", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                    new User { Id = 3, Username = "john_doe", Email = "john.doe@gmail.com", MobileNumber = "9876543210", PasswordHash = null, Role = "User", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) });
            }
        }
    }

