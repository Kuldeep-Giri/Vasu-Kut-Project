using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class EnquiryRequestModel
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public int? Quantity { get; set; }
        public string Requirement { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string? UserName { get; set; }
        public string UserId { get; set; } = string.Empty;
        public bool IsContacted { get; set; }
    }
}
