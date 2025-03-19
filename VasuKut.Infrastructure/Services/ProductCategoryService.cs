using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Infrastructure.Services
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly AppDbContext _context;
        
       public ProductCategoryService(AppDbContext context)
       {
            _context = context;
       }
        public async Task<List<CategoryResponseModel>> GetAllCategoryByKeyWord(string keyword)
        {
            
            var categories = await _context.ProductCategories
                .Where(c => c.Name.Contains(keyword))
                .OrderBy(c => c.Name)
                .ToListAsync();

            // Fetch all parents and children linked to those categories (for hierarchy building)
            var allCategories = await _context.ProductCategories.ToListAsync();

            // Build hierarchical response
            var result = categories
                .Select(c => new CategoryResponseModel
                {
                    CategoryId = c.CategoryId,
                    CategoryPath = BuildCategoryPath(c, allCategories)
                })
                    .Distinct()
                     .ToList();

            // Helper Method to Build Full Category Path (Recursive)

            return result;


        }


        public async Task<CategoryResponseModel> GetCategoryByChildId(int CategoryId)
        {

            var categories =  _context.ProductCategories
                .Where(c => c.CategoryId==CategoryId)
                .FirstOrDefault();

            // Fetch all parents and children linked to those categories (for hierarchy building)
            var allCategories = await _context.ProductCategories.ToListAsync();

            // Build hierarchical response
            var result = new CategoryResponseModel
            {
                CategoryId = categories.CategoryId,
                CategoryPath = BuildCategoryPath(categories, allCategories)
            };

            // Helper Method to Build Full Category Path (Recursive)

            return result;

        }
        string BuildCategoryPath(ProductCategory category, List<ProductCategory> allCategories)
        {
            var path = category.Name;
            while (category.ParentCategoryId.HasValue)
            {
                var parent = allCategories.FirstOrDefault(p => p.CategoryId == category.ParentCategoryId);
                if (parent == null) break;

                path = parent.Name + " / " + path;
                category = parent;
               
            }
           
            return path;
        }

    }
}
