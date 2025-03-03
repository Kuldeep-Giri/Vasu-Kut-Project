using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendOtpEmail(string email, string otp);
    }
}
