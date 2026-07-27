using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Helpers;
using System;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;

        // CHANGED: Parameter type changed from 'ModelCreatingBuilder' to 'ModelBuilder'
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Entity constraints (beginner-friendly EF Core Fluent API)
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.MobileNumber).IsRequired().HasMaxLength(15);
                entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
                entity.Property(e => e.PasswordHash).HasMaxLength(255); // Nullable for passwordless customers
            });

            // Seed initial data for project demonstration
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@restaurant.com",
                    MobileNumber = "1112223333",
                    PasswordHash = PasswordHelper.HashPassword("AdminPassword123"), // Seeded hashed password
                    Role = "Admin",
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new User
                {
                    Id = 2,
                    Username = "chef_maria",
                    Email = "chef.maria@restaurant.com",
                    MobileNumber = "4445556666",
                    PasswordHash = PasswordHelper.HashPassword("ChefPassword123"), // Seeded hashed password
                    Role = "Chef",
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new User
                {
                    Id = 3,
                    Username = "john_doe",
                    Email = "john.doe@gmail.com",
                    MobileNumber = "9876543210",
                    PasswordHash = null, // Customer login doesn't require a password in this system
                    Role = "User", // Role is User (Customer)
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}