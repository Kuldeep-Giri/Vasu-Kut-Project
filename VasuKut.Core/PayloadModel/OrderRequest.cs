using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;

namespace VasuKut.Core.PayloadModel
{
    public class OrderRequest
    {
       
            public string UserId { get; set; }
            public int SelectedAddressId { get; set; }
            public List<OrderItem> Items { get; set; } = new();
  

    }
    public class OrderItem
    {  
        public int ProductId { get; set; }
        public int Quantity { get; set; }
   //     public virtual ICollection<Product> Product { get; set; } = new List<Product>();

    }
}
