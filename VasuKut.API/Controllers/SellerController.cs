using Microsoft.AspNetCore.Mvc;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SellerController : ControllerBase
    {
        private readonly ISellerCompleteProfileService _profileService;

        public SellerController(ISellerCompleteProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpPost("upload-profile")]
        public async Task<IActionResult> UploadProfile([FromForm] SellerCompleteProfileResponse dto)
        {
            var result = await _profileService.CreateCompanyProfileAsync(dto);
            return Ok(new { message = "Profile uploaded successfully", data = result });
        }
    }
}
