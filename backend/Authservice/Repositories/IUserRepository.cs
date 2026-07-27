using backend.Models;
using System.Threading.Tasks;
namespace backend.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);

        Task<User?> GetByUsernameAsync(string username);

        Task<User?> GetByEmailAsync(string email);

        Task<User?> GetByMobileNumberAsync(string mobileNumber);

        // Custom query to find exact customer details for login
        Task<User?> GetCustomerAsync(string username, string email, string mobileNumber);

        Task<User> AddAsync(User user);

        Task<bool> ExistsByUsernameOrEmailAsync(string username, string email);

        Task<bool> ExistsByMobileNumberAsync(string mobileNumber);

        Task<bool> SaveChangesAsync();
    }
}