using Microsoft.AspNetCore.Mvc;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;
using VasuKut.Infrastructure.Services;

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

        [HttpGet("getEnquiry")]
        public IActionResult GetEnquiries(int pageNumber = 1, int pageSize = 10, bool? isContacted = null)
        {
            try
            {
                var result = _service.GetEnquiries(pageNumber, pageSize, isContacted);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("ContactEnquiry/{id}")]
        public IActionResult ContactEnquiry(int id)
        {
            try
            {
                var result = _service.ContactEnquiry(id);
                if (result == null)
                    return NotFound("Enquiry not found.");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

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
