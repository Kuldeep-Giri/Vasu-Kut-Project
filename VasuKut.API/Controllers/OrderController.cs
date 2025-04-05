using Microsoft.AspNetCore.Mvc;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.API.Controllers
{
    [Route("api/order")]
    [ApiController]

    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            var (success, message, transactionId) = await _orderService.ProcessOrderAsync(request);

            if (!success)
                return BadRequest(new { Success = false, Message = message });

            return Ok(new { Success = true, TransactionId = transactionId, Message = message });
        }

        [HttpGet("get/{userId}")]
        public async Task<IActionResult> GetUserOrders(string userId)
        {
            try
            {
                var orders = await _orderService.GetUserOrdersAsync(userId);
                if (orders == null || (orders is IEnumerable<object> orderList && !orderList.Any()))
                    return NotFound(new { Success = false, Message = "No orders found for this user." });

                return Ok(new { Success = true, Orders = orders });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Success = false, Message = $"Internal Server Error: {ex.Message}" });
            }
        }
    }
}
