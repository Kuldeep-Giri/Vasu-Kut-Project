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
    public class CartService : ICart
    {
        private readonly AppDbContext _context;
        public CartService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddToCart(CartRequest request)
        {
            if (request == null || request.ProductId <= 0 || string.IsNullOrEmpty(request.UserId))
                return false;

            var existingCartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == request.UserId && c.ProductId == request.ProductId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity += request.Quantity;
            }
            else
            {
                var cartItem = new Cart
                {
                    UserId = request.UserId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity
                };
                await _context.Carts.AddAsync(cartItem);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> MergeCart(List<CartRequest> guestCart, string userId)
        {
            foreach (var item in guestCart)
            {
                var existingCartItem = await _context.Carts
                    .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == item.ProductId);

                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += item.Quantity;
                }
                else
                {
                    var cartItem = new Cart
                    {
                        UserId = userId,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity
                    };
                    await _context.Carts.AddAsync(cartItem);
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<List<CartResponseDto>> GetCartItems(string userId)
        {
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .Include(c => c.Product)
                .ThenInclude(p => p.Images) // Include product images
                .Select(c => new CartResponseDto
                {
                    Id = c.Id,
                    ProductId = c.ProductId,
                    ProductName = c.Product.Name,
                    ImageUrl = c.Product.Images.Select(img => img.ImageUrl).FirstOrDefault(), // Use ImageUrl
                    Quantity = c.Quantity
                })
                .ToListAsync();

            return cartItems;
        }

        public async Task<bool> DeleteCartItem(int cartId)
        {
            try
            {
                var cartitem = await _context.Carts.FindAsync(cartId);

                _context.Carts.Remove(cartitem);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }

        }
        
        public async Task<bool> ClearCart(string userId)
        {
            var cartItems = _context.Carts.Where(c => c.UserId == userId).ToList();

            if (!cartItems.Any())
                return false;

            _context.Carts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
