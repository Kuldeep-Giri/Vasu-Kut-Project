using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Infrastructure.Data;

namespace VasuKut.Infrastructure.Helper
{
    public class SaveFile
    {
        private readonly IWebHostEnvironment _env;

        public SaveFile(  IWebHostEnvironment env)
        {
            
            _env = env;
        }
        public async Task<string> SaveFiles(IFormFile? file)
        {
            if (file == null) return null;

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"uploads/{fileName}";
        }

    }
}
