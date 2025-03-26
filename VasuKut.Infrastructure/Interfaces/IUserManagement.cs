using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IUserManagement
    {
        Task<(List<UserManagementResponce> users, int totalCount)> GetAllUsersAsync(int pageNumber, int pageSize, string? search="", string? role = "",
            string? status = "");
        Task<UserManagementResponce?> GetUserByIdAsync(string id);
        Task<bool> UpdateUserAsync(string id, UserManagementResponce updatedUser);
        Task<bool> ToggleIsDisableAsync(string id);
    }
}
