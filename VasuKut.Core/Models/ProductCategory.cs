using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class ProductCategory
    {
        [Key]
        public int CategoryId { get; set; }  
        public string Name { get; set; } = string.Empty;

        public int? ParentCategoryId { get; set; }  // Null for top-level categories
        public ProductCategory? ParentCategory { get; set; }
        public ICollection<ProductCategory> Subcategories { get; set; } = new List<ProductCategory>();

    }
}
