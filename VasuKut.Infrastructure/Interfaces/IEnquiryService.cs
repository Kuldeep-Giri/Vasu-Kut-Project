using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IEnquiryService
    {
        UserEnquiry CreateEnquiry(EnquiryRequestModel model);
        //IEnumerable<Enquiry> GetEnquiriesByUser(string userId);
        void DeleteEnquiry(int id);
    }
}
