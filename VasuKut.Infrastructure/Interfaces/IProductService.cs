using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IProductService
    {
        Task<(bool IsSuccess, string Message)> AddProductAsync(ProductCreateRequest request);
        Task<List<ProductResponse>> GetAllProductsAsync();
        Task<ProductSearchResponse> SearchProductsAsync(string searchTerm, int pageNumber, int pageSize);
        Task<List<ProductResponse>> GetProductsForAdminAsync(string? productName, int? isApproved, int? isShowcase);
        Task<bool> IsApproved(int id);
        Task<bool?> ToggleProductStatusAsync(int id);

        Task<ProductResponse> GetProductById(int id);
        Task<bool?> DeleteProductById(int id);
        Task<(bool IsSuccess, string Message)> UpdateProductAsync(int productId, ProductCreateRequest request);
    }
}
