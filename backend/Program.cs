using System.Text;
using backend.AI;
using backend.Data;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            // Add Swagger services
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IInventoryService, InventoryService>();
            builder.Services.AddScoped<IOfferService, OfferService>();
            builder.Services.Configure<AzureAiOptions>(builder.Configuration.GetSection(AzureAiOptions.SectionName));
            builder.Services.AddHttpClient<IAzureMlScoringClient, AzureMlScoringClient>((serviceProvider, client) =>
            {
                var aiOptions = serviceProvider.GetRequiredService<Microsoft.Extensions.Options.IOptions<AzureAiOptions>>().Value;
                client.Timeout = TimeSpan.FromSeconds(aiOptions.TimeoutSeconds);
            });
            builder.Services.AddScoped<RestaurantAiServices>();
            builder.Services.AddScoped<IRecommendationAiService>(provider => provider.GetRequiredService<RestaurantAiServices>());
            builder.Services.AddScoped<IDemandPredictionService>(provider => provider.GetRequiredService<RestaurantAiServices>());
            builder.Services.AddScoped<IOfferPredictionService>(provider => provider.GetRequiredService<RestaurantAiServices>());
            builder.Services.AddScoped<IInventoryPredictionService>(provider => provider.GetRequiredService<RestaurantAiServices>());
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IAuthService, AuthService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    var origins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>()
                        ?? new[] { "http://localhost:5173", "http://localhost:5174" };

                    policy.WithOrigins(origins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var secretKey = jwtSettings["SecretKey"] ?? "SuperSecretKeyForRestaurantManagementSystem123!";
            var issuer = jwtSettings["Issuer"] ?? "RestaurantAuthService";
            var audience = jwtSettings["Audience"] ?? "RestaurantReactClient";

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey)),
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            var app = builder.Build();

            // Enable Swagger in Development or all environments for easy testing
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "QR Dining API v1");
                c.RoutePrefix = "swagger";
            });

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // The local HTTP profile has no HTTPS listener. Production still always redirects to HTTPS.
            if (!app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("AllowFrontend");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
