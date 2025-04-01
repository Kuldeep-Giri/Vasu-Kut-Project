using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class CartRequest
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CartResponseDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; } = string.Empty; // Ensure correct naming
        public int Quantity { get; set; }
       
    }
}
