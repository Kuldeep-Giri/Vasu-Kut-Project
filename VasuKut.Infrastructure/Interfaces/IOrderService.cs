using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IOrderService
    {
        Task<(bool Success, string Message, Guid TransactionId)> ProcessOrderAsync(OrderRequest request);
        Task<object> GetUserOrdersAsync(string userId);
    }
}
