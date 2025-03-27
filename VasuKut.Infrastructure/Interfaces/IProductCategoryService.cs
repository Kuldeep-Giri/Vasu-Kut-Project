using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public  interface IProductCategoryService
    {
        Task<List<CategoryResponseModel>> GetAllCategoryByKeyWord(string keyWord);
        Task<CategoryResponseModel> GetCategoryByChildId(int CategoryId);
        Task<ProductCategory> CreateCategory(CategoryPayload category);
        Task<List<CategoryResponseModel>> GetCategories();




    }
}
