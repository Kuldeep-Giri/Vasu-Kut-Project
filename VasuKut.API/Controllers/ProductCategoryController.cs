using Microsoft.AspNetCore.Mvc;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.API.Controllers
{
    [Route("api/[controller]")]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService productCategoryService;

        public ProductCategoryController(IProductCategoryService _productCategoryService)
        {
            productCategoryService = _productCategoryService;
        }
        [HttpGet]
        public async Task<List<CategoryResponseModel>> GetCategoryByKeyword(string keyword)
        {
            return await productCategoryService.GetAllCategoryByKeyWord(keyword);
        }

        [HttpGet("GetCategoryByChildId/{id}")]
        public async Task<CategoryResponseModel> GetCategoryByChildId(int id)
        {
            return await productCategoryService.GetCategoryByChildId(id);
        }


    }
}
