using Microsoft.AspNetCore.Mvc;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnquiryController : ControllerBase
    {
        private readonly IEnquiryService _service;

        public EnquiryController(IEnquiryService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] EnquiryRequestModel model)
        {
            try
            {
                var enquiry = _service.CreateEnquiry(model);
                return Ok(enquiry);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        //[HttpGet("{userId}")]
        //public IActionResult GetByUser(string userId)
        //{
        //    var enquiries = _service.GetEnquiriesByUser(userId);
        //    return Ok(enquiries);
        //}

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _service.DeleteEnquiry(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }
    }
}
