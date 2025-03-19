using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class PriceRange
    {
        [Key]
        public int Id { get; set; }
        public int MinimumQuantity { get; set; }
        public int MaximumQuantity { get; set; }
        public decimal PricePerUnit { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }
}
