using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class ProductDetail
    {
        [Key]
        public int ProductDetailId { get; set; }
        public int ProductId { get; set; }

        public string FieldName { get; set; } = string.Empty;
        public string FieldValue { get; set; } = string.Empty;

        public Product Product { get; set; } = null!;
    }
}
