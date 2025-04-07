using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class OrderDetailsDto
    {
        public Guid TransactionId { get; set; }
        public DateTime OrderDate { get; set; }
        public int Quantity { get; set; }
        public string? UserName { get; set; }
        public string ProductName { get; set; }
        public int MinimumOrderQuantity { get; set; }
        public string? FirstImageUrl { get; set; }

        public string Name { get; set; }
        public string Mobile { get; set; }
        public string? StreetAddress { get; set; }
        public string? StreetAddress2 { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? District { get; set; }
        public string? ZipCode { get; set; }
    }
}
