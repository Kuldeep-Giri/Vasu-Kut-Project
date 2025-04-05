using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VasuKut.Core.Models;
using VasuKut.Core.PayloadModel;

namespace VasuKut.Infrastructure.Interfaces
{
    public interface IAddressService
    {
        Task<List<Address>> GetAllAddresses(string userId);
        Task<Address?> GetAddressById( string userId);
        Task<Address> AddAddress(AddressRequest request);
        Task<Address?> UpdateAddress( string userId, AddressRequest request);
        Task<bool> DeleteAddress(int id);
    }
}
