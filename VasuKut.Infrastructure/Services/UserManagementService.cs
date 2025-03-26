using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Infrastructure.Services
{
    public class UserManagementService : IUserManagement
    {
        private readonly AppDbContext _context;

        public UserManagementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(List<UserManagementResponce> users, int totalCount)> GetAllUsersAsync(
            int pageNumber,
            int pageSize,
            string? search = "",
            string? role = "",
            string? status = "")
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(u => u.UserName.Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(role))
            {
                query = query.Where(u => u.Role == role);
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                bool isActive = status.ToLower() == "active";
                // IsDisable = true means user is disabled, so reverse the logic
                query = query.Where(u => u.IsDisable == !isActive);
            }

            var totalCount = await query.CountAsync();

            var users = await query
                .OrderBy(u => u.UserName)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new UserManagementResponce
                {
                    Id = u.Id,
                    Role = u.Role,
                    UserName = u.UserName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    IsDisable = u.IsDisable
                })
                .ToListAsync();

            return (users, totalCount);
        }

        public async Task<UserManagementResponce?> GetUserByIdAsync(string id)
        {

            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserManagementResponce
                {
                    Id = u.Id,
                    Role = u.Role,
                    UserName = u.UserName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    IsDisable = u.IsDisable,
                    Code = u.Code,
                    Country = u.Country
                })
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<bool> ToggleIsDisableAsync(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.IsDisable = !user.IsDisable;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateUserAsync(string id, UserManagementResponce updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.UserName = updatedUser.UserName;
            user.Email = updatedUser.Email;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.Role = updatedUser.Role;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
