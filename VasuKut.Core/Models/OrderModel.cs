using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Core.Models
{
    public class OrderModel
    {
        [Key]
        public int Id { get; set; }
        public Guid TransactionId { get; set; }
        [Required]
        public int AddressId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        [ForeignKey("AddressId")]
        public Address Address { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();


    }
}
