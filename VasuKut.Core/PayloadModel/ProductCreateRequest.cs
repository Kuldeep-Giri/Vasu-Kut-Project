using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace VasuKut.Core.Models;

public class ProductCreateRequest
{
    [Required]
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
    public bool IsApproved { get; set; }
    public bool ShowcaseStatus { get; set; }
    public bool IsDeleted { get; set; }

    public string SellerId { get; set; }
    public List<SpecificationRequest> Specifications { get; set; } = new();
    public List<PriceRangeRequest> PriceRanges { get; set; } = new();

    public IFormFile? ProductVideo { get; set; } 


    public List<IFormFile>? ProductImages { get; set; }
}

public class SpecificationRequest
{
    public string Name { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public class PriceRangeRequest
{
    public int MinimumQuantity { get; set; }
    public int MaximumQuantity { get; set; }
    public decimal PricePerUnit { get; set; }
}
