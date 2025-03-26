using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class RegisterModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Buyer or Seller
        public string Country { get; set; }
        public string PhoneNumber { get; set; }

        public string Code { get; set; }
        public string FullName { get; set; }
    }
}
