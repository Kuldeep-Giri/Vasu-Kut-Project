using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
   
        public class OtpVerification
        {
            public int Id { get; set; }
            public string Email { get; set; }
            public string OtpCode { get; set; }
            public DateTime ExpiryTime { get; set; }
           public bool IsVerified { get; set; } = false; // New field to track verification status

    }

}
