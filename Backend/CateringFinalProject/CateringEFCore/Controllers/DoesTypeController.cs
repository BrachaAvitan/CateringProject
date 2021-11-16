using BL;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CateringEFCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoesTypeController : ControllerBase
    {
        private readonly IdoesTypeBL doesTypeBL;

        public DoesTypeController(IdoesTypeBL _idoesTypeBL)
        {
            this.doesTypeBL = _idoesTypeBL;
        }

        [HttpGet("DoseTypes")]
        public async Task<List<TblDoseType>> GetAll()
        {
            return await doesTypeBL.GetAllDoesTypeAsync();
        }

        [HttpGet("DoesTypeById")]
        public async Task<TblDoseType> GetDoesTypeAsync(int id)
        {
            return await doesTypeBL.GetDoesTypeAsync(id);
        }

        [HttpPost("InsertDoesType")]
        public async Task InsertDoesType(TblDoseType doseType)
        {
            await doesTypeBL.InsertDoesTypeAsync(doseType);
        }

        [HttpPut("UpdateCategory")]
        public async Task UpdateCategory(TblDoseType doesType)
        {
            await doesTypeBL.UpdateDoesTypeAsync(doesType);
        }

        [HttpDelete("DeleteDoesType")]
        public async Task DeleteDoesType(int id)
        {
            await doesTypeBL.DeleteDoesTypeAsync(id);
        }
    }
}

