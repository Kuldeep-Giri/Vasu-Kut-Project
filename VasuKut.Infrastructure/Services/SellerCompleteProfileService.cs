using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Infrastructure.Services
{
    internal class SellerCompleteProfileService
    {
        private readonly AppDbContext _context;

        public SellerCompleteProfileService(AppDbContext context)
        {
            _context = context;
        }

        //public Task<bool> SaveSellerCompleteProfileAsync(SellerCompleteProfile profile)
        //{
        //    //// Handle file uploads and saving
        //    //if (profile.Logo != null)
        //    //    profile.Logo = await SaveFileAsync(profile.Logo);

        //    //if (profile.ProfileBanner != null)
        //    //    profile.ProfileBanner = await SaveFileAsync(profile.ProfileBanner);

        //    //if (profile.SecondaryBanner != null)
        //    //    profile.SecondaryBanner = await SaveFileAsync(profile.SecondaryBanner);

        //    //if (profile.Brochure != null)
        //    //    profile.Brochure = await SaveFileAsync(profile.Brochure);

        //    //if (profile.CompanyVideo != null)
        //    //    profile.CompanyVideo = await SaveFileAsync(profile.CompanyVideo);

        //    //// Saving the profile in the database
        //    //await _context.SellerCompleteProfiles.AddAsync(profile);
        //    //var result = await _context.SaveChangesAsync();

        //    //return result > 0;

        //    return true;
        //}
    }
}
