using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CateringEFCore.Requests;
using CateringEFCore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CateringEFCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IManagerService managerService;

        public ValuesController(IManagerService _managerService)
        {
            this.managerService = _managerService;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Missing login details");
            }

            var loginResponse = await managerService.Login(loginRequest);

            if (loginResponse == null)
            {
                return BadRequest($"Invalid credentials");
            }

            return Ok(loginResponse);
        }
    }
}
