using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface ICart
    {
        Task<bool> AddToCart(CartRequest cartDto);
        Task<bool> MergeCart(List<CartRequest> guestCart, string userId);
        Task<List<CartResponseDto>> GetCartItems(string userId);
        Task<bool> DeleteCartItem(int cartId);
        Task<bool> ClearCart(string userId);
    }
}
