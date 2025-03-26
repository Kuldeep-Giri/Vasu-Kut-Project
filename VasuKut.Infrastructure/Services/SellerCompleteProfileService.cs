using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Infrastructure.Services
{
    public class SellerCompleteProfileService : ISellerCompleteProfileService
    {
        private readonly IWebHostEnvironment _env;
        private readonly AppDbContext _context;

        public SellerCompleteProfileService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<CompleteSellerProfile> CreateCompanyProfileAsync(SellerCompleteProfileResponse dto)
        {
            var profile = new CompleteSellerProfile
            {
                sellerId = dto.sellerId,
                CompanyName = dto.CompanyName,
                BusinessType = dto.BusinessType,
                Introduction = dto.Introduction,
                MainProduct = dto.MainProduct,
                Website = dto.Website,
                CountryRegion = dto.CountryRegion,
                State = dto.State,
                City = dto.City,
                Address = dto.Address,
                YearEstablished = dto.YearEstablished,
                NumberOfEmployees = dto.NumberOfEmployees,
                LogoPath = await SaveFile(dto.Logo),
                ProfileBannerPath = await SaveFile(dto.ProfileBanner),
                SecondaryBannerPath = await SaveFile(dto.SecondaryBanner),
                BrochurePath = await SaveFile(dto.Brochure),
                CompanyVideoPath = await SaveFile(dto.CompanyVideo),
                CompanyImages = new List<CompanyImage>()
            };

            if (dto.CompanyImages != null)
            {
                foreach (var img in dto.CompanyImages)
                {
                    profile.CompanyImages.Add(new CompanyImage
                    {
                        ImagePath = await SaveFile(img)
                    });
                }
            }

            _context.CompanyProfiles.Add(profile);
            await _context.SaveChangesAsync();

            return profile;
        }

        //public async Task UpdateProfileAsync(Guid sellerId, SellerCompleteProfileResponse dto)
        //{
        //    //var profile = await _context.CompanyProfiles.FirstOrDefaultAsync(p => p.SellerId == sellerId);

        //    //if (profile == null)
        //    //{
        //    //    profile = new SellerProfile
        //    //    {
        //    //        SellerId = sellerId
        //    //    };
        //    //    _context.SellerProfiles.Add(profile);
        //    //}

        //    //profile.CompanyName = dto.CompanyName;
        //    //profile.BusinessType = dto.BusinessType;
        //    //profile.Introduction = dto.Introduction;
        //    //profile.MainProduct = dto.MainProduct;
        //    //profile.Website = dto.Website;
        //    //profile.CountryRegion = dto.CountryRegion;
        //    //profile.State = dto.State;
        //    //profile.City = dto.City;
        //    //profile.Address = dto.Address;
        //    //profile.YearEstablished = dto.YearEstablished;
        //    //profile.NumberOfEmployees = dto.NumberOfEmployees;

        //    //if (dto.Logo != null)
        //    //    profile.LogoPath = await SaveFile(dto.Logo);

        //    //if (dto.ProfileBanner != null)
        //    //    profile.ProfileBannerPath = await SaveFile(dto.ProfileBanner);

        //    //if (dto.SecondaryBanner != null)
        //    //    profile.SecondaryBannerPath = await SaveFile(dto.SecondaryBanner);

        //    //if (dto.Brochure != null)
        //    //    profile.BrochurePath = await SaveFile(dto.Brochure);

        //    //if (dto.CompanyVideo != null)
        //    //    profile.CompanyVideoPath = await SaveFile(dto.CompanyVideo);

        //    //if (dto.CompanyImage != null)
        //    //    profile.CompanyImagePath = await SaveFile(dto.CompanyImage);

        //    //await _context.SaveChangesAsync();
        //}

        private async Task<string?> SaveFile(IFormFile? file)
        {
            if (file == null) return null;

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"uploads/{fileName}";
        }
    }
}
