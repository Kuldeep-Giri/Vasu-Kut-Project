using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class CategoryResponseModel
    {
        public int CategoryId { get; set; }
        public string CategoryPath { get; set; }
    }

    public class CategoryPayload
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? ParentId { get; set; }
    }
}
