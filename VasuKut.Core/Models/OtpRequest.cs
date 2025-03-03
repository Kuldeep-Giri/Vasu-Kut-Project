using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class OtpRequest
    {
        public string Email { get; set; }
    }

    public class OtpVerificationRequest
    {
        public string Email { get; set; }
        public string OtpCode { get; set; }
    }
}
