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
    [Route("[controller]")]
    [ApiController]
    public class DoseTypeController : ControllerBase
    {
        private readonly IDoseTypeBL doseTypeBL;

        public DoseTypeController(IDoseTypeBL _doseTypeBL)
        {
            this.doseTypeBL = _doseTypeBL;
        }

        [HttpGet("DoseTypes")]
        public async Task<List<TblDoseType>> GetAll()
        {
            return await doseTypeBL.GetDoseTypesAsync();
        }

        [HttpGet("DoseTypeById")]
        public async Task<TblDoseType> GetDoseTypeAsync(int id)
        {
            return await doseTypeBL.GetDoseTypeAsync(id);
        }

        [HttpPost("InsertDoseType")]
        public async Task InsertDoseType(TblDoseType doseType)
        {
            await doseTypeBL.InsertDoseTypeAsync(doseType);
        }

        [HttpPut("UpdateDoseType")]
        public async Task UpdateDoseType(TblDoseType doseType)
        {
            await doseTypeBL.UpdateDoseTypeAsync(doseType);
        }

        [HttpDelete("DeleteDoseType")]
        public async Task DeleteDoseType(int id)
        {
            await doseTypeBL.DeleteDoseTypeAsync(id);
        }
    }
}

