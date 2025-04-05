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

        //public IEnumerable<Enquiry> GetEnquiriesByUser(string userId)
        //{
        //    return _context.Enquiries
        //        .Include(e => e.User)
        //        .Where(e => e.UserId == userId)
        //        .ToList();
        //}

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
