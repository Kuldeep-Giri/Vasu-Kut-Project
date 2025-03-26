using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.PayloadModel
{
    public class SellerCompleteProfileResponse
    {
        public string sellerId { get; set; }
        public string CompanyName { get; set; }
        public string BusinessType { get; set; }
      
        public string? Introduction { get; set; }
      
        public string MainProduct { get; set; }
        public string? Website { get; set; }
        public string CountryRegion { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string YearEstablished { get; set; }
        public string NumberOfEmployees { get; set; }
        public IFormFile? Logo { get; set; }
        public IFormFile? ProfileBanner { get; set; }
        public IFormFile? SecondaryBanner { get; set; }
        public IFormFile? Brochure { get; set; }
        public IFormFile? CompanyVideo { get; set; }
        public List<IFormFile>? CompanyImages { get; set; }
    }
}
