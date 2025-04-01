using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;
using VasuKut.Infrastructure.Services;

namespace VasuKut.API.Controllers
{
    // Ensure the user is authenticated
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICart _cartService;

        public CartController(ICart cartService)
        {
            _cartService = cartService;
        }

        /// <summary>
        /// Adds a product to the cart or updates the quantity.
        /// </summary>
        /// <param name="cartDto">Product ID and Quantity</param>
        /// <returns>Success or error response</returns>
        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] CartRequest request)
        {
            var result = await _cartService.AddToCart(request);
            if (result)
                return Ok(new { message = "Product added to cart" });

            return BadRequest(new { message = "Failed to add product to cart" });
        }

        [HttpPost("merge")]
        public async Task<IActionResult> MergeCart([FromBody] List<CartRequest> guestCart, [FromQuery] string userId)
        {
            var result = await _cartService.MergeCart(guestCart, userId);
            if (result)
                return Ok(new { message = "Guest cart merged successfully" });

            return BadRequest(new { message = "Failed to merge guest cart" });
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetCartItems(string id)
        {
            try
            {
                var cartItems = await _cartService.GetCartItems(id);
                return Ok(cartItems);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var isDeleted = await _cartService.DeleteCartItem(id);

            if (!isDeleted)
                return NotFound(new { Message = "Banner not found or could not be deleted" });

            return Ok(new { Message = "Banner deleted successfully" });
        }

        [HttpDelete("clear/{userId}")]
        public async Task<IActionResult> ClearCart(string userId)
        {
            var result = await _cartService.ClearCart(userId);
            if (result)
                return Ok(new { message = "Cart cleared successfully" });

            return BadRequest(new { message = "Cart is already empty" });
        }
    }
}
