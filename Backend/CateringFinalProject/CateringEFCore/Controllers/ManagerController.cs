﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CateringEFCore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerBL managerBL;

        public ManagerController(IManagerBL _managerBL)
        {
            this.managerBL = _managerBL;
        }

        [HttpGet("Manager")]
        public async Task<List<TblManager>> GetAll()
        {
            return await managerBL.GetAllAsync();
        }

        [HttpGet("ManagerById")]
        public async Task<TblManager> GetManagerById(int id)
        {
            return await managerBL.GetManagerAsync(id);
        }

        [HttpGet("Login")]
        public async Task<TblManager> Login(string name, string password)
        {
            return await managerBL.Login(name, password);
        }

        [HttpPost("InsertManager")]
        public async Task InsertManager(TblManager manager)
        {
            await managerBL.InsertManagerAsync(manager);
        }

        [HttpPut("UpdateManager")]
        public async Task UpdateManager(TblManager manager)
        {
            await managerBL.UpdateManagerAsync(manager);
        }

        [HttpDelete("DeleteManager")]
        public async Task DeleteManager(int id)
        {
            await managerBL.DeleteManagerAsync(id);
        }
    }
}
