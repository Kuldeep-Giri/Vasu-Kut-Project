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
        object GetEnquiries(int pageNumber, int pageSize, bool? isContacted);
        void DeleteEnquiry(int id);
        string ContactEnquiry(int id);

    }
}
