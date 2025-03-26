using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface ISellerCompleteProfileService
    {
        Task<CompleteSellerProfile> CreateCompanyProfileAsync(SellerCompleteProfileResponse dto);
      //  Task UpdateProfileAsync(string sellerId, SellerCompleteProfileResponse dto);


    }
}
