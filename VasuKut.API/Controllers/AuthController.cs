using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VasuKut.Core.Models;
using VasuKut.Infrastructure.Interfaces;
using VasuKut.Infrastructure.Services;

namespace VasuKut.API.Controllers
{
    [Route("api/auth")]
    [ApiController]


    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        //private readonly EmailService _emailService;
        //private readonly OtpVerificationService _otpService;
        private readonly IEmailService _emailService;
        private readonly IOtpVerification _otpService;
        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config, IOtpVerification otpService)
        {
            _userManager = userManager;
            _config = config;
            _otpService = otpService;
        }
        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] OtpRequest request)
        {
            var emailSent = await _otpService.GenerateAndSendOtpAsync(request.Email);
            if (!emailSent)
                return StatusCode(500, "Failed to send OTP email.");

            return Ok("OTP sent successfully.");
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerificationRequest request)
        {
            var isValid = await _otpService.VerifyOtpAsync(request.Email, request.OtpCode);
            if (!isValid)
                return BadRequest("Invalid or expired OTP.");

            return Ok("OTP verified successfully.");
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = new ApplicationUser { UserName = model.FullName, Email = model.Email, Role = model.Role };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);
            await _userManager.AddToRoleAsync(user, model.Role);
            return Ok(new { Message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized();

            // Retrieve the key from the config
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

            // Validate the key length
            if (key.Length < 32) // 32 bytes = 256 bits
            {
                throw new InvalidOperationException("The JWT key must be at least 256 bits (32 characters).");
            }
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { Token = tokenHandler.WriteToken(token) });
        }



       
    }
}
