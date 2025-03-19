
using System.ComponentModel.DataAnnotations;

namespace VasuKut.Core.Models
{
    public class ProductSpecification
    {
        [Key]

        public int Id { get; set; }
        public string SpecificationName { get; set; } = string.Empty;
        public string SpecificationValue { get; set; } = string.Empty;
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }
}
