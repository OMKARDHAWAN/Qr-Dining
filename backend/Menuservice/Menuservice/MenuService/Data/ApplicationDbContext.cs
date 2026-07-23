using Microsoft.EntityFrameworkCore;
using MenuService.Models;

namespace MenuService.Data
{
    // Database context using Entity Framework Core for SQL Server
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSets representing  the tables
        public DbSet<Category> Categories { get; set; }
        public DbSet<MenuItemList> MenuItemLists { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map Entity class names to database table names singular
            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<MenuItemList>().ToTable("MenuItemList");
            modelBuilder.Entity<MenuItemList>()
    .Property(m => m.Price)
    .HasColumnType("decimal(10,2)");

            base.OnModelCreating(modelBuilder);
        }
    }
}
