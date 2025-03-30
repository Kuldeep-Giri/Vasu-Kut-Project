using Microsoft.AspNetCore.Mvc;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserManagementController : Controller
    {
        private readonly IUserManagement _userService;

        public UserManagementController(IUserManagement userService)
        {
            _userService = userService;
        }
        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers(int pageNumber = 1, int pageSize = 10, string? search = "", string? role = "", string? status = "")
        {
            var (users, totalCount,  activeUserCount,  inactiveUserCount) = await _userService.GetAllUsersAsync(pageNumber, pageSize,search,role,status);
            return Ok(new { users, totalCount, activeUserCount, inactiveUserCount });
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserManagementResponce updatedUser)
        {
            var result = await _userService.UpdateUserAsync(id, updatedUser);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPatch("togle/{id}")]
        public async Task<IActionResult> ToggleIsDisable(string id)
        {
            var result = await _userService.ToggleIsDisableAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
