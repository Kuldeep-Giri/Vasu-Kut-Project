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

        public async Task<object> GetUserOrdersAsync(string userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .GroupBy(o => o.TransactionId)
                .Select(orderGroup => new
                {
                    transactionId = orderGroup.Key,
                    orderDate = orderGroup.Max(o => o.OrderDate),
                    userId = userId,
                    selectedAddressId = orderGroup.First().AddressId,
                    address = _context.Addresses
                                .Where(a => a.Id == orderGroup.First().AddressId)
                                .Select(a => new
                                {
                                    a.Name,
                                    a.Mobile,
                                    a.Country,
                                    a.State,
                                    a.District,
                                    a.ZipCode
                                }).FirstOrDefault(),
                    items = orderGroup.Select(o => new
                    {
                        productId = o.ProductId,
                        quantity = o.Quantity,
                        product = _context.Products
                            .Where(p => p.Id == o.ProductId)
                            .Select(p => new
                            {
                                p.Id,
                                p.Name,
                                p.MinimumOrderQuantity,
                                firstImage = _context.ProductImages
                                                .Where(img => img.ProductId == p.Id)
                                                .Select(img => img.ImageUrl)
                                                .FirstOrDefault()
                            }).FirstOrDefault()
                    }).ToList()
                }).ToListAsync();

            return new { success = true, orders };
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

