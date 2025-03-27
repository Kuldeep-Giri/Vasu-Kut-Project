using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Core.Interfaces;

public class ProductService:IProductService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public ProductService(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }
    public async Task<(bool IsSuccess, string Message)> AddProductAsync(ProductCreateRequest request)
    {
        if (request.ProductImages.Count > 5)
        {
            return (false, "You can upload a maximum of 5 images.");
        }

        var product = new Product
        {
            Name = request.Name,
            Description = request.Description,
            Keywords = request.Keywords,
            PackagingDetails = request.PackagingDetails,
            MinimumOrderQuantity = request.MinimumOrderQuantity,
            TotalProductQuantity = request.TotalProductQuantity,
            NearestPort = request.NearestPort,
            DispatchDays = request.DispatchDays,
            MinPricePerUnit = request.MinPricePerUnit,
            MaxPricePerUnit = request.MaxPricePerUnit,
            Unit = request.Unit,
            CategoryId = request.CategoryId,
            SellerId= request.SellerId,
            IsApproved=false,
            IsDeleted=request.IsDeleted,
            ShowcaseStatus=request.ShowcaseStatus,
            Specifications = request.Specifications.Select(s => new ProductSpecification
            {
                SpecificationName = s.Name,
                SpecificationValue = s.Value
            }).ToList(),
            PriceRanges = request.PriceRanges.Select(pr => new PriceRange
            {
                MinimumQuantity = pr.MinimumQuantity,
                MaximumQuantity = pr.MaximumQuantity,
                PricePerUnit = pr.PricePerUnit
            }).ToList()
        };

        if (request.ProductImages != null)
        {
            foreach (var file in request.ProductImages)
            {
                var filePath = await SaveFile(file, "product-images");
                product.Images.Add(new ProductImage { ImageUrl = filePath });
            }
        }

        if (request.ProductVideo != null)
        {
            var filePath = await SaveFile(request.ProductVideo, "product-Video");

            product.Videos.Add(new ProductVideo { VideoUrl = filePath });
            
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return (true, "Product added successfully!");
    }

    public async Task<List<ProductResponse>> GetAllProductsAsync()
    {
        // Fetch all products along with their related entities
        var products = await _context.Products
            .Include(p => p.Images) // Include Product Images
            .Include(p => p.Videos) // Include Product Videos
            .Include(p => p.Specifications) // Include Product Specifications
            .Include(p => p.PriceRanges).Where(a=>a.IsDeleted==false && a.IsApproved == true && a.ShowcaseStatus == true) // Include Price Ranges
            .ToListAsync();

        // Map the Product entities to ProductResponse models
        var productResponses = products.Select(product => new ProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Keywords = product.Keywords,
            PackagingDetails = product.PackagingDetails,
            MinimumOrderQuantity = product.MinimumOrderQuantity,
            TotalProductQuantity = product.TotalProductQuantity,
            NearestPort = product.NearestPort,
            DispatchDays = product.DispatchDays,
            MinPricePerUnit = product.MinPricePerUnit,
            MaxPricePerUnit = product.MaxPricePerUnit,
            Unit = product.Unit,
            SellerId = product.SellerId,
            CategoryId = product.CategoryId,
            ShowcaseStatus=product.ShowcaseStatus,
            IsApproved=product.IsApproved,
            IsDeleted=product.IsDeleted,
            Specifications = product.Specifications.Select(spec => new SpecificationResponse
            {
                Name = spec.SpecificationName, // Map SpecificationName
                Value = spec.SpecificationValue // Map SpecificationValue
            }).ToList(),
            PriceRanges = product.PriceRanges.Select(priceRange => new PriceRangeResponse
            {
                MinimumQuantity = priceRange.MinimumQuantity,
                MaximumQuantity = priceRange.MaximumQuantity,
                PricePerUnit = priceRange.PricePerUnit
            }).ToList(),
            ProductVideoUrl = product.Videos.FirstOrDefault()?.VideoUrl, // Take the first video URL if exists
            ProductImageUrls = product.Images.Select(image => image.ImageUrl).ToList() // Assuming ImageUrl is a property of ProductImage
            
        }).ToList();

        return productResponses;
    }
    public async Task<List<ProductResponse>> GetProductsForAdminAsync(string? productName, int? isApproved,int?isShowcase)
    {
        // Base query
        var query = _context.Products
            .Include(p => p.Images)
            .Include(p => p.Videos)
            .Include(p => p.Specifications)
            .Include(p => p.PriceRanges)
            .Where(p => p.IsDeleted == false)
            .AsQueryable();

        // Filter by product name if provided
        if (!string.IsNullOrEmpty(productName))
        {
            query = query.Where(p => p.Name.Contains(productName));
        }

        // Filter by isApproved if provided
        if (isApproved.HasValue)
        {
            // Convert 1 to true, 0 to false
            bool approvedBool = isApproved.Value == 1;
            query = query.Where(p => p.IsApproved == approvedBool);
        }
        if (isShowcase.HasValue)
        {
            // Convert 1 to true, 0 to false
            bool showcase = isShowcase.Value == 1;
            query = query.Where(p => p.ShowcaseStatus == showcase);
        }
        var products = await query.ToListAsync();

        // Map to response
        var productResponses = products.Select(product => new ProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Keywords = product.Keywords,
            PackagingDetails = product.PackagingDetails,
            MinimumOrderQuantity = product.MinimumOrderQuantity,
            TotalProductQuantity = product.TotalProductQuantity,
            NearestPort = product.NearestPort,
            DispatchDays = product.DispatchDays,
            MinPricePerUnit = product.MinPricePerUnit,
            MaxPricePerUnit = product.MaxPricePerUnit,
            Unit = product.Unit,
            CategoryId = product.CategoryId,
            ShowcaseStatus = product.ShowcaseStatus,
            IsApproved = product.IsApproved,
            IsDeleted = product.IsDeleted,
            SellerId = product.SellerId,
            Specifications = product.Specifications.Select(spec => new SpecificationResponse
            {
                Name = spec.SpecificationName,
                Value = spec.SpecificationValue
            }).ToList(),
            PriceRanges = product.PriceRanges.Select(priceRange => new PriceRangeResponse
            {
                MinimumQuantity = priceRange.MinimumQuantity,
                MaximumQuantity = priceRange.MaximumQuantity,
                PricePerUnit = priceRange.PricePerUnit
            }).ToList(),
            ProductVideoUrl = product.Videos.FirstOrDefault()?.VideoUrl,
            ProductImageUrls = product.Images.Select(image => image.ImageUrl).ToList()
        }).ToList();

        return productResponses;
    }
    public async Task<bool> IsApproved(int id)
    {
        var user = await _context.Products.FindAsync(id);
        if (user == null) return false;

        user.IsApproved = !user.IsApproved;
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<string> SaveFile(IFormFile file, string folderName)
    {
        var rootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var uploadPath = Path.Combine(rootPath, folderName);
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        var fileName = $"{Guid.NewGuid()}_{file.FileName}";
        var filePath = Path.Combine(uploadPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"/{folderName}/{fileName}";
    }

    // ✅ Toggle product active status
    public async Task<bool?> ToggleProductStatusAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return null; // Product not found
        }

        // Toggle the status
        product.ShowcaseStatus = !product.ShowcaseStatus;
        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return product.ShowcaseStatus; // Return updated status
    }
    public async Task<bool?> DeleteProductById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return null; // Product not found
        }

        // Toggle the status
        product.IsDeleted = true;
        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return product.IsDeleted; // Return updated status
    }


    public async Task<ProductResponse> GetProductById(int id)
    {
        // Fetch all products along with their related entities
        var product =  _context.Products
            .Include(p => p.Images) // Include Product Images
            .Include(p => p.Videos) // Include Product Videos
            .Include(p => p.Specifications) // Include Product Specifications
            .Include(p => p.PriceRanges) // Include Price Ranges
            .FirstOrDefault(a=>a.Id==id && a.IsDeleted==false);

        // Map the Product entities to ProductResponse models
        var productResponses = new ProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Keywords = product.Keywords,
            PackagingDetails = product.PackagingDetails,
            MinimumOrderQuantity = product.MinimumOrderQuantity,
            TotalProductQuantity = product.TotalProductQuantity,
            NearestPort = product.NearestPort,
            DispatchDays = product.DispatchDays,
            MinPricePerUnit = product.MinPricePerUnit,
            MaxPricePerUnit = product.MaxPricePerUnit,
            Unit = product.Unit,
            CategoryId = product.CategoryId,
            ShowcaseStatus = product.ShowcaseStatus,
            IsApproved = product.IsApproved,
            IsDeleted = product.IsDeleted,
            Specifications = product.Specifications.Select(spec => new SpecificationResponse
            {
                Name = spec.SpecificationName, // Map SpecificationName
                Value = spec.SpecificationValue // Map SpecificationValue
            }).ToList(),
            PriceRanges = product.PriceRanges.Select(priceRange => new PriceRangeResponse
            {
                MinimumQuantity = priceRange.MinimumQuantity,
                MaximumQuantity = priceRange.MaximumQuantity,
                PricePerUnit = priceRange.PricePerUnit
            }).ToList(),
            ProductVideoUrl = product.Videos.FirstOrDefault()?.VideoUrl, // Take the first video URL if exists
            ProductImageUrls = product.Images.Select(image => image.ImageUrl).ToList() // Assuming ImageUrl is a property of ProductImage

        };

        return productResponses;

    }
    public async Task<(bool IsSuccess, string Message)> UpdateProductAsync(int productId, ProductCreateRequest request)
    {
        var product = await _context.Products
            .Include(p => p.Images)
            .Include(p => p.Videos)
            .Include(p => p.Specifications)
            .Include(p => p.PriceRanges)
            .FirstOrDefaultAsync(p => p.Id == productId && !p.IsDeleted);

        if (product == null)
        {
            return (false, "Product not found");
        }

        // Check and update only changed fields
        if (product.Name != request.Name) product.Name = request.Name;
        if (product.Description != request.Description) product.Description = request.Description;
        if (product.Keywords != request.Keywords) product.Keywords = request.Keywords;
        if (product.PackagingDetails != request.PackagingDetails) product.PackagingDetails = request.PackagingDetails;
        if (product.MinimumOrderQuantity != request.MinimumOrderQuantity) product.MinimumOrderQuantity = request.MinimumOrderQuantity;
        if (product.TotalProductQuantity != request.TotalProductQuantity) product.TotalProductQuantity = request.TotalProductQuantity;
        if (product.NearestPort != request.NearestPort) product.NearestPort = request.NearestPort;
        if (product.DispatchDays != request.DispatchDays) product.DispatchDays = request.DispatchDays;
        if (product.MinPricePerUnit != request.MinPricePerUnit) product.MinPricePerUnit = request.MinPricePerUnit;
        if (product.MaxPricePerUnit != request.MaxPricePerUnit) product.MaxPricePerUnit = request.MaxPricePerUnit;
        if (product.Unit != request.Unit) product.Unit = request.Unit;
        if (product.CategoryId != request.CategoryId) product.CategoryId = request.CategoryId;
        if (product.ShowcaseStatus != request.ShowcaseStatus) product.ShowcaseStatus = request.ShowcaseStatus;
        if (product.IsApproved != request.IsApproved) product.IsApproved = request.IsApproved;
        if (product.IsDeleted != request.IsDeleted) product.IsDeleted = request.IsDeleted;

        // Update only changed specifications
        if (!product.Specifications.SequenceEqual(request.Specifications.Select(s => new ProductSpecification
        {
            SpecificationName = s.Name,
            SpecificationValue = s.Value
        })))
        {
            product.Specifications.Clear();
            product.Specifications = request.Specifications.Select(s => new ProductSpecification
            {
                SpecificationName = s.Name,
                SpecificationValue = s.Value
            }).ToList();
        }

        // Update only changed price ranges
        if (!product.PriceRanges.SequenceEqual(request.PriceRanges.Select(pr => new PriceRange
        {
            MinimumQuantity = pr.MinimumQuantity,
            MaximumQuantity = pr.MaximumQuantity,
            PricePerUnit = pr.PricePerUnit
        })))
        {
            product.PriceRanges.Clear();
            product.PriceRanges = request.PriceRanges.Select(pr => new PriceRange
            {
                MinimumQuantity = pr.MinimumQuantity,
                MaximumQuantity = pr.MaximumQuantity,
                PricePerUnit = pr.PricePerUnit
            }).ToList();
        }

        // Handle Images only if there are new ones
        if (request.ProductImages != null && request.ProductImages.Any())
        {
            product.Images.Clear(); // Remove old images
            foreach (var file in request.ProductImages)
            {
                var filePath = await SaveFile(file, "product-images");
                product.Images.Add(new ProductImage { ImageUrl = filePath });
            }
        }

        // Handle Video only if there is a new one
        if (request.ProductVideo != null)
        {
            product.Videos.Clear(); // Remove old video
            var filePath = await SaveFile(request.ProductVideo, "product-videos");
            product.Videos.Add(new ProductVideo { VideoUrl = filePath });
        }

        await _context.SaveChangesAsync();
        return (true, "Product updated successfully!");
    }

}
