using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class ProductVideo
    {
        [Key]
        public int Id { get; set; }
        public string VideoUrl { get; set; } = string.Empty;
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }
}
