using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class ProductResponse
    {
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
        public int CategoryId { get; set; }

        public string SellerId { get; set; }

        public bool ShowcaseStatus { get; set; }
        public bool IsDeleted { get; set; }

        public bool IsApproved { get; set; }
        public List<SpecificationResponse> Specifications { get; set; } = new();
        public List<PriceRangeResponse> PriceRanges { get; set; } = new();
        public string ProductVideoUrl { get; set; } = string.Empty; // URL of the video
        public List<string> ProductImageUrls { get; set; } = new(); // List of image URLs
        public DateTime CreatedAt { get; set; }
    }

    public class SpecificationResponse
    {
        public string Name { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }

    public class PriceRangeResponse
    {
        public int MinimumQuantity { get; set; }
        public int MaximumQuantity { get; set; }
        public decimal PricePerUnit { get; set; }
    }

}
