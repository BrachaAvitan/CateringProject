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
    public class ToolController : ControllerBase
    {
        private readonly IToolBL toolBL;

        public ToolController(IToolBL _toolBL)
        {
            this.toolBL = _toolBL;
        }

        [HttpGet("Tools")]
        public async Task<List<TblTools>> GetAll()
        {
            return await toolBL.GetAllAsync();
        }

        [HttpGet("ToolById")]
        public async Task<TblTools> GetToolById(int id)
        {
            return await toolBL.GetToolAsync(id);
        }

        [HttpPost("InsertTool")]
        public async Task InsertTool(TblTools tool)
        {
            await toolBL.InsertToolAsync(tool);
        }

        [HttpPut("UpdateTool")]
        public async Task UpdateTool(TblTools tool)
        {
            await toolBL.UpdateToolAsync(tool);
        }

        [HttpDelete("DeleteTool")]
        public async Task DeleteTool(int id)
        {
            await toolBL.DeleteToolAsync(id);
        }
    }
}
