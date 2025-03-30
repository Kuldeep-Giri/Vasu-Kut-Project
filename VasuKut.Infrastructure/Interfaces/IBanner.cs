using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IBanner
    {
        //Task<IEnumerable<BannerResponce>> GetImagesAsync(int page);
        Task<Banner> UploadImageAsync(IFormFile file);
        Task<bool> DeleteBannerImageAsync(int bannerId);
        Task<List<Banner>> GetAllBannerImagesAsync();
        //Task<bool> DeleteImageAsync(int id);
    }
}
