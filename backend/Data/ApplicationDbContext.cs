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
        public DbSet<Order> Orders { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }

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
                new User { Id = 3, Username = "john_doe", Email = "john.doe@gmail.com", MobileNumber = "9876543210", PasswordHash = null, Role = "User", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, CategoryName = "Popular" },
                new Category { Id = 2, CategoryName = "Pizza" },
                new Category { Id = 3, CategoryName = "Burger" },
                new Category { Id = 4, CategoryName = "Beverages" },
                new Category { Id = 5, CategoryName = "Dessert" }
            );

            modelBuilder.Entity<MenuItem>().HasData(
                new MenuItem { Id = 1, ItemName = "Paneer Butter Masala", Price = 299m, Description = "Rich creamy cottage cheese gravy.", Status = true, CategoryId = 1, ImageUrl = "/assets/inventory/paneer.jpg" },
                new MenuItem { Id = 2, ItemName = "Chicken Biryani", Price = 349m, Description = "Aromatic hyderabadi biryani.", Status = true, CategoryId = 1, ImageUrl = "/assets/images/burger.jpg" },
                new MenuItem { Id = 3, ItemName = "Margherita Pizza", Price = 249m, Description = "Classic cheese & basil pizza.", Status = true, CategoryId = 2, ImageUrl = "/assets/images/pizza.jpg" },
                new MenuItem { Id = 4, ItemName = "Farmhouse Pizza", Price = 399m, Description = "Loaded with fresh vegetables.", Status = true, CategoryId = 2, ImageUrl = "/assets/images/farmhouse.jpg" },
                new MenuItem { Id = 5, ItemName = "Classic Veg Burger", Price = 149m, Description = "Crispy veg patty with fresh lettuce.", Status = true, CategoryId = 3, ImageUrl = "/assets/images/burger.jpg" },
                new MenuItem { Id = 6, ItemName = "Coca-Cola 500ml", Price = 60m, Description = "Chilled soft drink.", Status = true, CategoryId = 4, ImageUrl = "/assets/images/coca-cola.jpg" },
                new MenuItem { Id = 7, ItemName = "Pepsi 500ml", Price = 60m, Description = "Chilled soft drink.", Status = true, CategoryId = 4, ImageUrl = "/assets/images/pepsi.jpg" },
                new MenuItem { Id = 8, ItemName = "Gulab Jamun (2 pcs)", Price = 99m, Description = "Warm soft sweet balls in sugar syrup.", Status = true, CategoryId = 5, ImageUrl = "/assets/menu/gulab-jamun.jpg" }
            );

            modelBuilder.Entity<Order>().HasData(
                new Order { Id = 1, TableId = 2, OrderItems = "Paneer Butter Masala x1, Garlic Naan x2", Price = 399m, Status = "Pending", Quantity = 3, Duration = "15 mins", PaymentStatus = "Paid", TransactionId = "TXN1001", PaymentMethod = "UPI" },
                new Order { Id = 2, TableId = 5, OrderItems = "Chicken Biryani x2, Coke x2", Price = 818m, Status = "Preparing", Quantity = 4, Duration = "20 mins", PaymentStatus = "Paid", TransactionId = "TXN1002", PaymentMethod = "Card" },
                new Order { Id = 3, TableId = 1, OrderItems = "Margherita Pizza x1, Pepsi x1", Price = 309m, Status = "Prepared", Quantity = 2, Duration = "10 mins", PaymentStatus = "Paid", TransactionId = "TXN1003", PaymentMethod = "UPI" }
            );

            modelBuilder.Entity<Inventory>().HasData(
                new Inventory { Id = 1, InventoryName = "Chicken", Price = 220m, Qty = 25, Status = "In Stock", Category = "Meat", LowStockThreshold = 10 },
                new Inventory { Id = 2, InventoryName = "Paneer", Price = 350m, Qty = 5, Status = "Low Stock", Category = "Dairy", LowStockThreshold = 8 },
                new Inventory { Id = 3, InventoryName = "Rice", Price = 80m, Qty = 50, Status = "In Stock", Category = "Grains", LowStockThreshold = 20 },
                new Inventory { Id = 4, InventoryName = "Tomato", Price = 40m, Qty = 0, Status = "Out of Stock", Category = "Vegetables", LowStockThreshold = 5 },
                new Inventory { Id = 5, InventoryName = "Cooking Oil", Price = 150m, Qty = 15, Status = "In Stock", Category = "Grocery", LowStockThreshold = 5 }
            );

            modelBuilder.Entity<Offer>().HasData(
                new Offer { Id = 1, Title = "Flat 20% OFF on Starters", Description = "Get 20% discount on all starters above ₹299", DiscountType = "Percentage", DiscountValue = 20m, MinOrderAmount = 299m, StartDate = new DateTime(2026, 1, 1), EndDate = new DateTime(2026, 12, 31), CouponCode = "WELCOME20", ApplicableCategory = "Starters", IsActive = true },
                new Offer { Id = 2, Title = "Weekend Feast ₹100 OFF", Description = "Flat ₹100 discount on orders above ₹500", DiscountType = "Fixed", DiscountValue = 100m, MinOrderAmount = 500m, StartDate = new DateTime(2026, 1, 1), EndDate = new DateTime(2026, 12, 31), CouponCode = "FEAST100", ApplicableCategory = "All", IsActive = true }
            );
        }
    }
}
