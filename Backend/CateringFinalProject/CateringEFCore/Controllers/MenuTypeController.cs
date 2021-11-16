using System;
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
    public class MenuTypeController : ControllerBase
    {
        private readonly IMenuTypesBL menuTypeBL;

        public MenuTypeController(IMenuTypesBL _menuTypeBL)
        {
            this.menuTypeBL = _menuTypeBL;
        }

        [HttpGet("MenuTypes")]
        public async Task<List<TblMenuTypes>> GetAll()
        {
            return await menuTypeBL.GetAllMenuTypesAsync();
        }

        [HttpGet("MenuTypeById")]
        public async Task<TblMenuTypes> GetMenuTypeById(int id)
        {
            return await menuTypeBL.GetMenuTypeAsync(id);
        }

        [HttpPost("InsertMenuType")]
        public async Task InsertMenuType(TblMenuTypes menuType)
        {
            await menuTypeBL.InsertMenuTypeAsync(menuType);
        }

        [HttpPut("UpdateMenuType")]
        public async Task UpdateMenuType(TblMenuTypes menuType)
        {
            await menuTypeBL.UpdateMenuTypeAsync(menuType);
        }

        [HttpDelete("DeleteMenuType")]
        public async Task DeleteMenuType(int id)
        {
            await menuTypeBL.DeleteMenuTypeAsync(id);
        }
    }
}
