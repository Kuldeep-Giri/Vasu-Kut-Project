using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet("getAll/{userId}")]
        public async Task<IActionResult> GetAll(string userId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                    return BadRequest("UserId cannot be empty.");

                var addresses = await _addressService.GetAllAddresses(userId);
                return Ok(addresses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest("Id cannot be empty.");

                var address = await _addressService.GetAddressById(id);
                if (address == null)
                    return NotFound("Address not found.");

                return Ok(address);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddressRequest request)
        {
            try
            {
                if (request == null)
                    return BadRequest("Invalid request data.");

                var address = await _addressService.AddAddress(request);
                return CreatedAtAction(nameof(GetById), new { id = address.Id }, address);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] AddressRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest("Id cannot be empty.");

                if (request == null)
                    return BadRequest("Invalid request data.");

                var updatedAddress = await _addressService.UpdateAddress(id, request);
                if (updatedAddress == null)
                    return NotFound("Address not found.");

                return Ok(updatedAddress);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
 

                var success = await _addressService.DeleteAddress(id);
                if (!success)
                    return NotFound("Address not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
