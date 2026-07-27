using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Services
{
    public interface IAuthService
    {
        // Customer session registration or login using Username, Email, and Mobile
        Task<CustomerLoginResponse?> CustomerLoginAsync(CustomerLoginRequest request);

        // Staff (Admin / Chef) login using Username and Password
        Task<CustomerLoginResponse?> StaffLoginAsync(StaffLoginRequest request);

        // Admin-only action to create a Chef account
        Task<UserDto?> CreateChefAsync(ChefRegisterRequest request);
    }
}
