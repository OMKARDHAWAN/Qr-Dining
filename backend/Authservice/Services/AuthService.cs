using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using backend.DTOs;
using backend.Helpers;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<LoginResponse?> CustomerLoginAsync(CustomerLoginRequest request)
        {
            // Try to find the customer in the database by their details
            var user = await _userRepository.GetCustomerAsync(request.Username, request.Email, request.MobileNumber);

            if (user == null)
            {
                // Business Rule / Best Practice: In a QR restaurant system, customers are registered on-the-fly 
                // when they enter their details for the first time.
                
                // Let's check if the Username or Email is already taken by a Staff member to avoid collisions
                var isTaken = await _userRepository.ExistsByUsernameOrEmailAsync(request.Username, request.Email);
                if (isTaken)
                {
                    return null; // Username or Email is already in use by another account type
                }

                // Auto-register the customer
                user = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    MobileNumber = request.MobileNumber,
                    PasswordHash = null, // Customer has no password (session-based)
                    Role = "User", // Standard Customer Role
                    CreatedAt = DateTime.UtcNow
                };

                await _userRepository.AddAsync(user);
                await _userRepository.SaveChangesAsync();
            }

            // Generate JWT Token
            return GenerateLoginResponse(user);
        }

        public async Task<LoginResponse?> StaffLoginAsync(StaffLoginRequest request)
        {
            // Find staff by Username
            var user = await _userRepository.GetByUsernameAsync(request.Username);

            // Verify user exists, is either Admin or Chef, and password matches
            if (user == null || user.Role == "User" || string.IsNullOrEmpty(user.PasswordHash))
            {
                return null; // Staff login only allows Admin & Chef roles
            }

            // Verify hashed password
            bool isPasswordCorrect = PasswordHelper.VerifyPassword(request.Password, user.PasswordHash);
            if (!isPasswordCorrect)
            {
                return null; // Invalid credentials
            }

            // Generate JWT Token
            return GenerateLoginResponse(user);
        }

        public async Task<UserDto?> CreateChefAsync(ChefRegisterRequest request)
        {
            // Business Rule: Check if username or email is already registered
            var exists = await _userRepository.ExistsByUsernameOrEmailAsync(request.Username, request.Email);
            if (exists)
            {
                return null; // Account already exists
            }

            // Hash the password for the Chef account
            var chef = new User
            {
                Username = request.Username,
                Email = request.Email,
                MobileNumber = request.MobileNumber,
                PasswordHash = PasswordHelper.HashPassword(request.Password),
                Role = "Chef", // Explicitly assigned role
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(chef);
            await _userRepository.SaveChangesAsync();

            return new UserDto
            {
                Id = chef.Id,
                Username = chef.Username,
                Email = chef.Email,
                MobileNumber = chef.MobileNumber,
                Role = chef.Role
            };
        }

        // --- Helper Methods ---

        private LoginResponse GenerateLoginResponse(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            // Retrieve JWT settings from appsettings.json
            var secretKey = _configuration["Jwt:SecretKey"] ?? "SuperSecretKeyForRestaurantManagementSystem123!";
            var issuer = _configuration["Jwt:Issuer"] ?? "RestaurantAuthService";
            var audience = _configuration["Jwt:Audience"] ?? "RestaurantReactClient";
            var expiryInMinutes = double.Parse(_configuration["Jwt:ExpiryInMinutes"] ?? "120");

            var key = Encoding.ASCII.GetBytes(secretKey);

            // Add JWT Claims (Payload data)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role), // Claims-based role authorization
                new Claim("MobileNumber", user.MobileNumber)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expiryInMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new LoginResponse
            {
                Token = tokenString,
                Expiration = tokenDescriptor.Expires.Value,
                User = new UserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    MobileNumber = user.MobileNumber,
                    Role = user.Role
                }
            };
        }
    }
}
