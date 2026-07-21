using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using backend.Repositories;
using backend.Services;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add MVC Controllers and Views (suitable if project is a mix of API and MVC views)
            builder.Services.AddControllersWithViews();

            // 1. CONFIGURE CORS FOR REACT CLIENT
            // React application defaults to http://localhost:5173 (Vite).
            // Update this URL if your frontend runs on a different port or domain.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactCorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()                     // Allow GET, POST, PUT, DELETE
                          .AllowAnyHeader()                     // Allow headers like Content-Type, Authorization
                          .AllowCredentials();                  // Allow cookie credentials if needed
                });
            });

            // 2. CONFIGURE DATABASE (SQL SERVER & EF CORE)
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            // 3. REGISTER REPOSITORIES AND SERVICES (DEPENDENCY INJECTION)
            builder.Services.AddScoped<IUserRepository, backend.Repositories.UserRepository>();
            builder.Services.AddScoped<IAuthService, AuthService>();

            // 4. CONFIGURE JWT AUTHENTICATION
            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var secretKey = jwtSettings["SecretKey"] ?? "SuperSecretKeyForRestaurantManagementSystem123!";
            var issuer = jwtSettings["Issuer"] ?? "RestaurantAuthService";
            var audience = jwtSettings["Audience"] ?? "RestaurantReactClient";
            var key = Encoding.ASCII.GetBytes(secretKey);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // Set to true in production
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero // Remove default 5-minute delay on token expiry
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts(); // Adds HSTS header for security
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting(); // Identifies endpoints

            // 5. ACTIVATE CORS MIDDLEWARE
            // CRITICAL ORDER: UseCors MUST be placed after UseRouting and BEFORE UseAuthentication/UseAuthorization
            app.UseCors("ReactCorsPolicy");

            // 6. ACTIVATE AUTHENTICATION & AUTHORIZATION
            app.UseAuthentication();
            app.UseAuthorization();

            // Maps controllers and default MVC routing
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}