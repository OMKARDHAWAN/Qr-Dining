using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
            var user = await _userRepository.GetCustomerAsync(request.Username, request.Email, request.MobileNumber);

            if (user == null)
            {
                var isTaken = await _userRepository.ExistsByUsernameOrEmailAsync(request.Username, request.Email);
                if (isTaken)
                {
                    return null;
                }

                user = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    MobileNumber = request.MobileNumber,
                    PasswordHash = null,
                    Role = "User",
                    CreatedAt = DateTime.UtcNow
                };

                await _userRepository.AddAsync(user);
                await _userRepository.SaveChangesAsync();
            }

            return GenerateLoginResponse(user);
        }

        public async Task<LoginResponse?> StaffLoginAsync(StaffLoginRequest request)
        {
            var user = await _userRepository.GetByUsernameAsync(request.Username);

            if (user == null || user.Role == "User" || string.IsNullOrEmpty(user.PasswordHash))
            {
                return null;
            }

            bool isPasswordCorrect = PasswordHelper.VerifyPassword(request.Password, user.PasswordHash);
            if (!isPasswordCorrect)
            {
                return null;
            }

            return GenerateLoginResponse(user);
        }

        public async Task<UserDto?> CreateChefAsync(ChefRegisterRequest request)
        {
            var exists = await _userRepository.ExistsByUsernameOrEmailAsync(request.Username, request.Email);
            if (exists)
            {
                return null;
            }

            var chef = new User
            {
                Username = request.Username,
                Email = request.Email,
                MobileNumber = request.MobileNumber,
                PasswordHash = PasswordHelper.HashPassword(request.Password),
                Role = "Chef",
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

        // ====================================================
        // STAFF CRUD OPERATIONS
        // ====================================================

        public async Task<IEnumerable<UserDto>> GetAllStaffAsync()
        {
            var list = await _userRepository.GetAllStaffAsync();
            return list.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                MobileNumber = u.MobileNumber,
                Role = u.Role
            });
        }

        public async Task<UserDto?> GetStaffByIdAsync(int id)
        {
            var u = await _userRepository.GetByIdAsync(id);
            if (u == null || (u.Role != "Chef" && u.Role != "Admin")) return null;

            return new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                MobileNumber = u.MobileNumber,
                Role = u.Role
            };
        }

        public async Task<UserDto?> CreateStaffAsync(ChefRegisterRequest request)
        {
            var exists = await _userRepository.ExistsByUsernameOrEmailAsync(request.Username, request.Email);
            if (exists) return null;

            var staff = new User
            {
                Username = request.Username,
                Email = request.Email,
                MobileNumber = request.MobileNumber,
                PasswordHash = PasswordHelper.HashPassword(request.Password),
                Role = "Chef", // Default role for created staff members
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(staff);
            await _userRepository.SaveChangesAsync();

            return new UserDto
            {
                Id = staff.Id,
                Username = staff.Username,
                Email = staff.Email,
                MobileNumber = staff.MobileNumber,
                Role = staff.Role
            };
        }

        public async Task<bool> UpdateStaffAsync(int id, ChefRegisterRequest request)
        {
            var u = await _userRepository.GetByIdAsync(id);
            if (u == null || (u.Role != "Chef" && u.Role != "Admin")) return false;

            u.Username = request.Username;
            u.Email = request.Email;
            u.MobileNumber = request.MobileNumber;
            if (!string.IsNullOrEmpty(request.Password))
            {
                u.PasswordHash = PasswordHelper.HashPassword(request.Password);
            }

            return await _userRepository.SaveChangesAsync();
        }

        public async Task<bool> DeleteStaffAsync(int id)
        {
            var u = await _userRepository.GetByIdAsync(id);
            if (u == null || (u.Role != "Chef" && u.Role != "Admin")) return false;

            _userRepository.Delete(u);
            return await _userRepository.SaveChangesAsync();
        }

        // ====================================================
        // CUSTOMER CRUD OPERATIONS
        // ====================================================

        public async Task<IEnumerable<UserDto>> GetAllCustomersAsync()
        {
            var list = await _userRepository.GetAllCustomersAsync();
            return list.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                MobileNumber = u.MobileNumber,
                Role = u.Role
            });
        }

        public async Task<UserDto?> GetCustomerByIdAsync(int id)
        {
            var u = await _userRepository.GetByIdAsync(id);
            if (u == null || u.Role != "User") return null;

            return new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                MobileNumber = u.MobileNumber,
                Role = u.Role
            };
        }

        public async Task<bool> UpdateCustomerAsync(int id, CustomerLoginRequest request)
        {
            var u = await _userRepository.GetByIdAsync(id);
            if (u == null || u.Role != "User") return false;

            u.Username = request.Username;
            u.Email = request.Email;
            u.MobileNumber = request.MobileNumber;

            return await _userRepository.SaveChangesAsync();
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            var u = await _userRepository.GetByIdAsync(id);
            if (u == null || u.Role != "User") return false;

            _userRepository.Delete(u);
            return await _userRepository.SaveChangesAsync();
        }

        // --- Helper Methods ---

        private LoginResponse GenerateLoginResponse(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = _configuration["Jwt:SecretKey"] ?? "SuperSecretKeyForRestaurantManagementSystem123!";
            var issuer = _configuration["Jwt:Issuer"] ?? "RestaurantAuthService";
            var audience = _configuration["Jwt:Audience"] ?? "RestaurantReactClient";
            var expiryInMinutes = double.Parse(_configuration["Jwt:ExpiryInMinutes"] ?? "120");

            var key = Encoding.ASCII.GetBytes(secretKey);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
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
