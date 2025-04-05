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
    public class AddressService : IAddressService
    {
        private readonly AppDbContext _context;

        public AddressService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Address>> GetAllAddresses(string userId)
        {
            return await _context.Addresses.Where(a => a.UserId == userId).ToListAsync();
        }

        public async Task<Address?> GetAddressById( string userId)
        {
            return await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == userId);
        }

        public async Task<Address> AddAddress(AddressRequest request)
        {
            var address = new Address
            {
                UserId = request.UserId,
                Name = request.Name,
                Mobile = request.Mobile,
                StreetAddress = request.StreetAddress,
                StreetAddress2 = request.StreetAddress2,
                Country = request.Country,
                State = request.State,
                District = request.District,
                ZipCode = request.ZipCode
            };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
            return address;
        }

        public async Task<Address?> UpdateAddress( string userId, AddressRequest request)
        {
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId ==  userId);
            if (address == null) return null;

            address.Name = request.Name;
            address.Mobile = request.Mobile;
            address.StreetAddress = request.StreetAddress;
            address.StreetAddress2 = request.StreetAddress2;
            address.Country = request.Country;
            address.State = request.State;
            address.District = request.District;
            address.ZipCode = request.ZipCode;

            await _context.SaveChangesAsync();
            return address;
        }

        public async Task<bool> DeleteAddress( int id)
        {
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id);
            if (address == null) return false;

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
