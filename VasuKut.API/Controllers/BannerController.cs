using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using VasuKut.Infrastructure.Interfaces;
using VasuKut.Core.PayloadModel;

namespace VasuKut.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BannerController : ControllerBase
    {
        private readonly IBanner _bannerService;
        public BannerController(IBanner bannerService)
        {
            _bannerService = bannerService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadBanner(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Invalid file");

            var banner = await _bannerService.UploadImageAsync(file);
            return Ok(banner);
        }

        [HttpGet("GetAllBanners")]
        public async Task<IActionResult> GetAllBanners()
        {
            var banners = await _bannerService.GetAllBannerImagesAsync();

            if (banners == null || !banners.Any())
                return NotFound(new { Message = "No banners found" });

            return Ok(new { Message = "Banners retrieved successfully", Data = banners });
        }

        [HttpDelete("DeleteBanner/{id}")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var isDeleted = await _bannerService.DeleteBannerImageAsync(id);

            if (!isDeleted)
                return NotFound(new { Message = "Banner not found or could not be deleted" });

            return Ok(new { Message = "Banner deleted successfully" });
        }

    }

}
