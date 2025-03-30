using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.API.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize(Roles = "Seller")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductController> _logger;

    public ProductController(IProductService productService, ILogger<ProductController> logger)
    {
        _productService = productService;
        _logger = logger;

    }

    [HttpPost("add")]
    public async Task<IActionResult> AddProduct([FromForm] ProductCreateRequest request)
    {
        var result = await _productService.AddProductAsync(request);
        if (result.IsSuccess)
        {
            return Ok(new { Message = result.Message });
        }
        else
        {
            return BadRequest(new { Message = result.Message });
        }
    }

    [HttpPut("UpdateProduct/{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromForm] ProductCreateRequest request)
    {
        if (request == null)
        {
            return BadRequest(new { message = "Invalid request data" });
        }

        var result = await _productService.UpdateProductAsync(id, request);

        if (!result.IsSuccess)
        {
            return NotFound(new { message = result.Message });
        }

        return Ok(new { message = result.Message });
    }
    [HttpGet("ProductList")]
    public async Task<ActionResult<List<ProductResponse>>> GetAllProducts()
    {
        try
        {
            var products = await _productService.GetAllProductsAsync();

            if (products == null || !products.Any())
            { 
                _logger.LogInformation("No products found in the database.");
                return NotFound(new { Message = "Product not found" });
            }

            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching products.");
            return StatusCode(500, new { Message = "An error occurred while processing your request." });
        }
    }


    [HttpGet("search")]
    public async Task<IActionResult> SearchProducts(
        [FromQuery] string searchTerm,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var result = await _productService.SearchProductsAsync(searchTerm, pageNumber, pageSize);
        return Ok(result);
    }

    [HttpGet("ProductForAdmin")]
    public async Task<IActionResult> GetProductsForAdmin(string? search, int? isApproved, int? isShowcase)
    {
        var result = await _productService.GetProductsForAdminAsync(search, isApproved, isShowcase);
        return Ok(result);
    }
    [HttpPatch("Approval/{id}")]
    public async Task<IActionResult> ToggleIsDisable(int id)
    {
        var result = await _productService.IsApproved(id);
        if (!result) return NotFound();
        return NoContent();
    }
    // ✅ PUT: Toggle Product Active Status
    [HttpPut("toggle/{id}")]
    public async Task<IActionResult> ToggleProductStatus(int id)
    {
          var newStatus = await _productService.ToggleProductStatusAsync(id);
        if (newStatus == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        return Ok(new { message = "Product status updated", isActive = newStatus });
    }
    // ✅ PUT: Toggle Product Active Status
    [HttpGet("Delete/{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var newStatus = await _productService.DeleteProductById(id);
        if (newStatus == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        return Ok(new { message = "Product Deleted", isDeleted = newStatus });
    }


    [HttpGet("GetProductById/{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _productService.GetProductById(id);

        return Ok(product);
    }
}
