using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }

        public async Task<User?> GetByMobileNumberAsync(string mobileNumber)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.MobileNumber == mobileNumber);
        }

        public async Task<User?> GetCustomerAsync(string username, string email, string mobileNumber)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower() && 
                                           u.Email.ToLower() == email.ToLower() && 
                                           u.MobileNumber == mobileNumber &&
                                           u.Role == "User");
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            return user;
        }

        public async Task<bool> ExistsByUsernameOrEmailAsync(string username, string email)
        {
            return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower() || 
                                                       u.Email.ToLower() == email.ToLower());
        }

        public async Task<IEnumerable<User>> GetAllStaffAsync()
        {
            return await _context.Users
                .Where(u => u.Role == "Chef" || u.Role == "Admin")
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAllCustomersAsync()
        {
            return await _context.Users
                .Where(u => u.Role == "User")
                .ToListAsync();
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
