using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VasuKut.Core.Models
{
    public class Banner
    {
        [Key]
        public int Id { get; set; }

        [NotMapped] // Exclude from EF Core mapping (only used in file uploads)
        public IFormFile File { get; set; }

        public string FileName { get; set; }  // Store file name in the database
        public string FilePath { get; set; }
        public DateTime UploadedAt { get; set; }

    }
}
