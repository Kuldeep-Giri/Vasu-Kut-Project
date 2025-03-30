using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Keywords { get; set; } = string.Empty;

        public string PackagingDetails { get; set; } = string.Empty;
        public int MinimumOrderQuantity { get; set; }
        public int TotalProductQuantity { get; set; }
        public string NearestPort { get; set; } = string.Empty;
        public int DispatchDays { get; set; }
        public decimal MinPricePerUnit { get; set; }
        public decimal MaxPricePerUnit { get; set; }
        public string Unit { get; set; } = string.Empty;
        public string? SellerId { get; set; }
        public bool ShowcaseStatus { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsApproved { get; set; }

        public int CategoryId { get; set; }

        public ProductCategory Category { get; set; } = null!;

        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
        public ICollection<ProductVideo> Videos { get; set; } = new List<ProductVideo>();
        public ICollection<ProductSpecification> Specifications { get; set; } = new List<ProductSpecification>();
        public ICollection<PriceRange> PriceRanges { get; set; } = new List<PriceRange>();
    }

}
