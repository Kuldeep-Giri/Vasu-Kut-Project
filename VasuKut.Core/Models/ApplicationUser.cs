using Microsoft.AspNetCore.Identity;

namespace VasuKut.Core.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Role { get; set; }
        public string Country { get; set; }
        public string Code { get; set; }
        public bool IsDisable { get; set; } = true; // 👈 Custom field
    }
}
