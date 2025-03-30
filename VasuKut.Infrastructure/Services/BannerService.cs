using Azure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Helper;
using VasuKut.Infrastructure.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace VasuKut.Infrastructure.Services
{
    public class BannerService : IBanner
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;
        private const int PageSize = 5;
        private readonly SaveFile _saveFile;

         public BannerService(AppDbContext context, IWebHostEnvironment env, SaveFile saveFile)
        {
            _context = context;
            _env = env;
            _saveFile = saveFile;
        }
        public async Task<List<Banner>> GetAllBannerImagesAsync()
        {
            try
            {
                var banners = await _context.Banners.ToListAsync();
                return banners;
            }
            catch
            {
                return null; // Handle errors in the controller
            }
        }
        public async Task<Banner> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Invalid file");

            // Save file and get file path
            var filePath = await _saveFile.SaveFiles(file);

            if (string.IsNullOrEmpty(filePath))
                throw new Exception("File saving failed, filePath is empty");

            var banner = new Banner
            {
                            // Not stored in DB, just used temporarily
                FileName = file.FileName,  // Ensure FileName is not null
                FilePath = filePath,        // Store the actual file path
                UploadedAt = DateTime.UtcNow
            };

            _context.Banners.Add(banner);
            await _context.SaveChangesAsync();

            return banner;
        }


        public async Task<bool> DeleteBannerImageAsync(int bannerId)
        {
            try
            {
                var banner = await _context.Banners.FindAsync(bannerId);
                if (banner == null)
                    return false;

                // ✅ Check if file exists before attempting to delete
                if (!string.IsNullOrEmpty(banner.FilePath) && System.IO.File.Exists(banner.FilePath))
                {
                    try
                    {
                        System.IO.File.Delete(banner.FilePath);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error deleting file: {ex.Message}");
                        return false;  // Prevent DB deletion if file deletion fails
                    }
                }

                // ✅ Remove the banner record from the database
                _context.Banners.Remove(banner);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }


    }
}
