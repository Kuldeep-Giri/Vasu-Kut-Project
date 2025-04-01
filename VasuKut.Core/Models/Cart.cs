using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } // JWT Token will provide this

        [Required]
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
