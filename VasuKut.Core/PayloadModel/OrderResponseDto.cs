using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;

namespace VasuKut.Core.PayloadModel
{
    public class OrderResponseDto
    {
        public Guid TransactionId { get; set; }
        public DateTime OrderDate { get; set; }
        public AddressDto Address { get; set; }
        public List<OrderItemDto> Items { get; set; } = new List<OrderItemDto>();
    }

    public class AddressDto
    {
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal MinPricePerUnit { get; set; }
        public decimal MaxPricePerUnit { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    }

}
