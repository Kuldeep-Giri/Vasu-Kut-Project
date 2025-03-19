using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class SellerCompleteProfile
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; } // User ID to associate the profile with the logged-in user
        public string CompanyName { get; set; }
        public string BusinessType { get; set; }
        public IFormFile Logo { get; set; }
        public string Introduction { get; set; }
        public IFormFile ProfileBanner { get; set; }
        public IFormFile SecondaryBanner { get; set; }
        public string MainProduct { get; set; }
        public string Website { get; set; }
        public string CountryRegion { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string YearEstablished { get; set; }
        public string NumberOfEmployees { get; set; }
        public IFormFile Brochure { get; set; }
        public IFormFile CompanyVideo { get; set; }
        public List<IFormFile> CompanyImages { get; set; } = new List<IFormFile>();
    }
}
