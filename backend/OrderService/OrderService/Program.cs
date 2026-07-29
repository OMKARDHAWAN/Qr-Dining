using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Interfaces;
using OrderService.Repositories;
using OrderService.Services;

namespace OrderService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // configure db context with sql server connection
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // register repository dependency injection
            builder.Services.AddScoped<IOrderRepository, OrderRepository>();

            // register payment gateway service dependency injection
            builder.Services.AddScoped<IPaymentGatewayService, PaymentGatewayService>();

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials();
                });
            });

            var app = builder.Build();

            app.UseCors("ReactApp");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();

        }
    }
}