using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;

namespace VasuKut.Core.Models
{
    public class CompleteSellerProfile
    {
        [Key]
        public int Id { get; set; }
        public string sellerId { get; set; }
        public string CompanyName { get; set; }
        public string BusinessType { get; set; }
        public string? LogoPath { get; set; }
        public string? Introduction { get; set; }
        public string? ProfileBannerPath { get; set; }
        public string? SecondaryBannerPath { get; set; }
        public string MainProduct { get; set; }
        public string? Website { get; set; }
        public string CountryRegion { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string YearEstablished { get; set; }
        public string NumberOfEmployees { get; set; }
        public string? BrochurePath { get; set; }
        public string? CompanyVideoPath { get; set; }
        public List<CompanyImage> CompanyImages { get; set; } = new();
    }


    public class CompanyImage
    {
        [Key]
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public int SellerProfileId { get; set; }
        public CompleteSellerProfile SellerProfile { get; set; }
    }
}

