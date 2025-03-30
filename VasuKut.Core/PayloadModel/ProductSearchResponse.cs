using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class ProductSearchResponse
    {
        public List<ProductResponse> Products { get; set; } = new List<ProductResponse>();
        public int TotalCount { get; set; } // Total products count for frontend
    }
}
