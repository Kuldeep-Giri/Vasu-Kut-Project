using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Infrastructure.Services
{
    public class EnquiryService : IEnquiryService
    {
        private readonly AppDbContext _context;

        public EnquiryService(AppDbContext context)
        {
            _context = context;
        }

        public UserEnquiry CreateEnquiry(EnquiryRequestModel model)
        {
          

            var enquiry = new UserEnquiry
            {
                FullName = model.FullName,
                Email = model.Email,
                Phone = model.Phone,
                Industry = model.Industry,
                Quantity = model.Quantity,
                Requirement = model.Requirement,
                UserId = model.UserId
            };

            _context.UserEnquiry.Add(enquiry);
            _context.SaveChanges();
            return enquiry;
        }

        public object GetEnquiries(int pageNumber, int pageSize, bool? isContacted)
        {
            var query = from e in _context.UserEnquiry
                        join u in _context.Users on e.UserId equals u.Id into userGroup
                        from u in userGroup.DefaultIfEmpty() // LEFT JOIN
                        select new EnquiryRequestModel
                        {
                            Id = e.Id,
                            FullName = e.FullName,
                            Email = e.Email,
                            Phone = e.Phone,
                            Industry = e.Industry,
                            Quantity = e.Quantity,
                            Requirement = e.Requirement,
                            CreatedAt = e.CreatedAt,
                            UserName = u != null ? u.UserName : "Unknown",
                            UserId = u != null ? u.Id : "N/A",
                            IsContacted = e.IsContacted
                        };

            // Apply filter if provided
            if (isContacted.HasValue)
            {
                query = query.Where(e => e.IsContacted == isContacted.Value);
            }

            // Pagination logic
            var totalRecords = query.Count();
            var paginatedEnquiries = query
                .OrderBy(e => e.CreatedAt) // Sort by date
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new
            {
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Enquiries = paginatedEnquiries
            };
        }

        public string ContactEnquiry(int id)
        {
            var enquiry = _context.UserEnquiry.Find(id);
            if (enquiry == null)
            {
                throw new Exception("Enquiry not found.");
            }

            enquiry.IsContacted = true; // Mark as contacted
            _context.SaveChanges();

            return "Enquiry marked as contacted.";
        }
        public void DeleteEnquiry(int id)
        {
            var enquiry = _context.UserEnquiry.Find(id);
            if (enquiry == null)
                throw new KeyNotFoundException("Enquiry not found");

            _context.UserEnquiry.Remove(enquiry);
            _context.SaveChanges();
        }
    }
}
