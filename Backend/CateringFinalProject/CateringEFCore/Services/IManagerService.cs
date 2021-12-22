using CateringEFCore.Requests;
using CateringEFCore.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CateringEFCore.Services
{
    public interface IManagerService
    {
        Task<LoginResponse> Login(LoginRequest loginRequest);
    }
}
