using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection.Emit;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using static System.Net.Mime.MediaTypeNames;

namespace VasuKut.Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<OtpVerification> OtpVerifications { get; set; }


        public DbSet<ProductCategory>  ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductVideo> ProductVideos { get; set; }
        public DbSet<ProductSpecification> ProductSpecifications { get; set; }
        public DbSet<PriceRange> PriceRanges { get; set; }
        //public DbSet<CompleteSellerProfile> CompanyProfiles { get; set; }
        //public DbSet<CompanyImage> CompanyImages { get; set; }
        public DbSet<Cart>Carts { get; set; }
        public DbSet<Banner> Banners { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<OtpVerification>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.OtpCode).IsRequired();
                entity.Property(e => e.ExpiryTime).IsRequired();
            });
            // Category Parent-Child Relationship
            builder.Entity<ProductCategory>()
                
                .HasOne(c => c.ParentCategory)
                .WithMany(c => c.Subcategories)
                .HasForeignKey(c => c.ParentCategoryId)
                
                .OnDelete(DeleteBehavior.Restrict);

            // Product Relationships
            builder.Entity<Product>()
                .HasMany(p => p.Images)
                .WithOne(i => i.Product)
                .HasForeignKey(i => i.ProductId);

            builder.Entity<Product>()
                .HasMany(p => p.Videos)
                .WithOne(v => v.Product)
                .HasForeignKey(v => v.ProductId);

            builder.Entity<Product>()
                .HasMany(p => p.Specifications)
                .WithOne(s => s.Product)
                .HasForeignKey(s => s.ProductId);

            builder.Entity<Product>()
                .HasMany(p => p.PriceRanges)
                .WithOne(pr => pr.Product)
                .HasForeignKey(pr => pr.ProductId);

          

            builder.Entity<Banner>().Ignore(b => b.FileName);
        }
    }
}