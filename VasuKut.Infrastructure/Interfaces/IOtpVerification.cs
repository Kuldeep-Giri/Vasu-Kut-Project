using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IOtpVerification
    {
        Task<bool> GenerateAndSendOtpAsync(string email);
        Task<bool> VerifyOtpAsync(string email, string otpCode);
    }
}
