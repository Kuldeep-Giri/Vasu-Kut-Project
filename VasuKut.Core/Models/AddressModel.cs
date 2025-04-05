using System.ComponentModel.DataAnnotations;

namespace VasuKut.Core.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Mobile { get; set; }

       
        public string StreetAddress { get; set; }

        public string? StreetAddress2 { get; set; }

      
        public string Country { get; set; }

        public string State { get; set; }

        
        public string District { get; set; }

        [Required]
        public string ZipCode { get; set; }
    }
}
