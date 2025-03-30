using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class ProductSearchResponse
    {
        public List<ProductResponse> Products { get; set; }
        public List<string> AvailablePorts { get; set; }
        public List<string> AvailableSpecificationNames { get; set; }
        public List<int> AvailableCategories { get; set; }
    }
}
