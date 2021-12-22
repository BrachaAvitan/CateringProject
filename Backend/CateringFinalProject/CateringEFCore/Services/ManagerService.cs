using CateringEFCore.Helpers;
using CateringEFCore.Requests;
using CateringEFCore.Responses;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CateringEFCore.Services
{
    public class ManagerService : IManagerService
    {
        private readonly CateringDBContext cateringDbContext;

        public ManagerService(CateringDBContext _cateringDbContext)
        {
            this.cateringDbContext = _cateringDbContext;
        }

        public async Task<LoginResponse> Login(LoginRequest loginRequest)
        {
            var customer = cateringDbContext.TblManager.SingleOrDefault(customer => customer.Name == loginRequest.Username);

            if (customer == null)
            {
                return null;
            }
            var passwordHash = HashingHelper.HashUsingPbkdf2(loginRequest.Password, customer.PasswordSalt);
            //var passwordHash = loginRequest.Password;

            if (customer.Password != passwordHash)
            {
                return null;
            }

            var token = await Task.Run(() => TokenHelper.GenerateToken(customer));

            return new LoginResponse { Username = customer.Name, FirstName = customer.Name, LastName = customer.Name, Token = token };
        }
    }
}