using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
        
        Task<User?> GetByUsernameAsync(string username);
        
        Task<User?> GetByEmailAsync(string email);
        
        Task<User?> GetByMobileNumberAsync(string mobileNumber);
        
        Task<User?> GetCustomerAsync(string username, string email, string mobileNumber);
        
        Task<User> AddAsync(User user);
        
        Task<bool> ExistsByUsernameOrEmailAsync(string username, string email);
        
        Task<IEnumerable<User>> GetAllStaffAsync();
        
        Task<IEnumerable<User>> GetAllCustomersAsync();
        
        void Delete(User user);
        
        Task<bool> SaveChangesAsync();
    }
}
