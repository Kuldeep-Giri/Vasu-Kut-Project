using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class SearchProductResponse
    {
        public List<ProductResponse> Products { get; set; } = new();
        public FilterOptions Filters { get; set; } = new();
    }

    public class FilterOptions
    {
        public List<int> Categories { get; set; } = new();
        public List<string> NearestPorts { get; set; } = new();
        public Dictionary<string, List<string>> Specifications { get; set; } = new();
    }
}
