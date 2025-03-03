using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using VasuKut.Infrastructure.Interfaces;


namespace VasuKut.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<bool> SendOtpEmail(string email, string otp)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("VasuKut", _config["EmailSettings:SenderEmail"]));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Your OTP Code";

            message.Body = new TextPart("plain")
            {
                Text = $"Your OTP code is: {otp}"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_config["EmailSettings:SmtpServer"], int.Parse(_config["EmailSettings:SmtpPort"]), false);
                await client.AuthenticateAsync(_config["EmailSettings:SenderEmail"], _config["EmailSettings:SenderPassword"]);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }

            return true;
        }
    }
}
