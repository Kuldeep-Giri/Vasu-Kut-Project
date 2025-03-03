using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VasuKut.Infrastructure.Data;
using VasuKut.Core.Models;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Infrastructure.Services
{
    public class OtpVerificationService:IOtpVerification
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public OtpVerificationService(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        /// <summary>
        /// Generates an OTP, saves it to the database, and sends it via email.
        /// </summary>
        public async Task<bool> GenerateAndSendOtpAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
                throw new ArgumentException("Email is required.");

            // Generate a 6-digit OTP
            var otpCode = new Random().Next(100000, 999999).ToString();
            var expiryTime = DateTime.UtcNow.AddMinutes(10);

            // Save OTP to database
            var otpEntry = new OtpVerification
            {
                Email = email,
                OtpCode = otpCode,
                ExpiryTime = expiryTime,
                IsVerified = false
            };

            _context.OtpVerifications.Add(otpEntry);
            await _context.SaveChangesAsync();

            // Send OTP via email
            //   return await _emailService.SendOtpEmail(email, otpCode);
            return true;
        }

        /// <summary>
        /// Validates the OTP and marks it as verified if correct.
        /// </summary>
        public async Task<bool> VerifyOtpAsync(string email, string otpCode)
        {
            var otpEntry = await _context.OtpVerifications
                .Where(o => o.Email == email && o.OtpCode == otpCode)
                .OrderByDescending(o => o.ExpiryTime)
                .FirstOrDefaultAsync();

            if (otpEntry == null || otpEntry.ExpiryTime < DateTime.UtcNow)
                return false;

            otpEntry.IsVerified = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
