using backend.DTOs;
using backend.Helpers;
using backend.Models;
using backend.Repositories;
using backend.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        // In-memory static dictionary to store active OTP codes (MobileNumber -> OTP)
        private static readonly Dictionary<string, string> _activeOtps = new();
        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }
        public async Task<CustomerLoginResponse> CustomerLoginAsync(CustomerLoginRequest request)
        {
            // 1. Check if the customer exists by their Mobile Number
            var user = await _userRepository.GetByMobileNumberAsync(request.MobileNumber);
            if (user != null)
            {
                // Customer is registered!
                // If they haven't provided an OTP code, send/generate a new OTP
                if (string.IsNullOrEmpty(request.Otp))
                {
                    // Generate a random 6-digit OTP
                    var random = new Random();
                    var generatedOtp = random.Next(100000, 999999).ToString();

                    // Store the generated OTP associated with this mobile number
                    _activeOtps[request.MobileNumber] = generatedOtp;
                    // In a production system, you would integrate an SMS gateway here (Twilio, Fast2SMS, etc.)
                    // For the college project, we return the generated OTP in the message so it can be easily copied and tested.
                    return new CustomerLoginResponse
                    {
                        IsRegistered = true,
                        OtpSent = true,
                        Message = $"OTP sent to your registered mobile number. (For Testing, your OTP is: {generatedOtp})"
                    };
                }
                // If OTP is provided, verify it
                if (_activeOtps.TryGetValue(request.MobileNumber, out var storedOtp) && request.Otp == storedOtp)
                {
                    // Clean up the verified OTP
                    _activeOtps.Remove(request.MobileNumber);
                    return GenerateCustomerLoginResponse(user, "Login successful!");
                }
                return new CustomerLoginResponse
                {
                    IsRegistered = true,
                    OtpSent = true,
                    Message = "Invalid OTP code. Please try again."
                };
            }
            // 2. Customer is NOT registered!
            // If they haven't provided Name and Email, ask for registration details
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Email))
            {
                return new CustomerLoginResponse
                {
                    IsRegistered = false,
                    OtpSent = false,
                    Message = "Mobile number not registered. Please provide your Name and Email to register."
                };
            }
            // If Name and Email are provided, check if the username or email is already taken by a Staff member
            var isTaken = await _userRepository.ExistsByUsernameOrEmailAsync(request.Username, request.Email);
            if (isTaken)
            {
                return new CustomerLoginResponse
                {
                    IsRegistered = false,
                    OtpSent = false,
                    Message = "Username or Email is already registered by a staff member."
                };
            }
            // Register the new customer
            user = new User
            {
                Username = request.Username,
                Email = request.Email,
                MobileNumber = request.MobileNumber,
                PasswordHash = null, // Customer has no password
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            // Return JWT token automatically after successful registration and login
            return GenerateCustomerLoginResponse(user, "Registration and login successful!");
        }
        private CustomerLoginResponse GenerateCustomerLoginResponse(User user, string message)
        {
            var loginResponse = GenerateLoginResponse(user);
            return new CustomerLoginResponse
            {
                IsRegistered = true,
                OtpSent = true,
                Token = loginResponse.Token,
                Expiration = loginResponse.Expiration,
                User = loginResponse.User,
                Message = message
            };
        }
        public async Task<CustomerLoginResponse?> StaffLoginAsync(StaffLoginRequest request)
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
        private CustomerLoginResponse GenerateLoginResponse(User user)
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
            return new CustomerLoginResponse
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

        Task<CustomerLoginResponse?> IAuthService.CustomerLoginAsync(CustomerLoginRequest request)
        {
            throw new NotImplementedException();
        }

      
        Task<CustomerLoginResponse?> IAuthService.StaffLoginAsync(StaffLoginRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
