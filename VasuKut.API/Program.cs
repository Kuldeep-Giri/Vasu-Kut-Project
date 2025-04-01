using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VasuKut.Core.Interfaces;
using VasuKut.Core.Models;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Helper;
using VasuKut.Infrastructure.Interfaces;
using VasuKut.Infrastructure.Services;

var options = new WebApplicationOptions
{
    Args = args,
    WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")
};
var builder = WebApplication.CreateBuilder(options);
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<IOtpVerification, OtpVerificationService>();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IProductCategoryService, ProductCategoryService>();
//builder.Services.AddTransient<ISellerCompleteProfileService, SellerCompleteProfileService>();
builder.Services.AddTransient<IUserManagement, UserManagementService>();
builder.Services.AddTransient<IBanner, BannerService>();
builder.Services.AddTransient<SaveFile>();
builder.Services.AddTransient<ICart, CartService>();



// Configure Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProdConnectionString")));

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Configure Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });



// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")  // Allow localhost:4200 origin
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();  // Allow credentials like cookies or Authorization headers
        });
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Logging.AddConsole();
var app = builder.Build();

// Apply CORS before authentication and authorization
app.UseCors("AllowLocalhost");  // Ensure this comes before UseAuthentication and UseAuthorization
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
