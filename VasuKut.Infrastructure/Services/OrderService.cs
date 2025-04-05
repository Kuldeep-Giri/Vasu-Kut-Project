using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;
using VasuKut.Infrastructure.Data;
using VasuKut.Infrastructure.Interfaces;

namespace VasuKut.Infrastructure.Services
{
    public class OrderService:IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public Task<object> GetUserOrdersAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<(bool Success, string Message, Guid TransactionId)> ProcessOrderAsync(OrderRequest request)
        {
            if (request.Items == null || request.Items.Count == 0)
                return (false, "Order must contain at least one product.", Guid.Empty);

            if (request.SelectedAddressId <= 0)
                return (false, "Invalid address selected.", Guid.Empty);


            Guid transactionId = Guid.NewGuid();

            var orders = new List<OrderModel>();
            foreach (var item in request.Items)
            {
                orders.Add(new OrderModel
                {
                    TransactionId = transactionId,
                    UserId = request.UserId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    AddressId = request.SelectedAddressId,
                });
            }

            await _context.Orders.AddRangeAsync(orders);
            await _context.SaveChangesAsync();

            return (true, "Order processed successfully.", transactionId);
        }
    }

}

