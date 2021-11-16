using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL;
using Entity.Models;

namespace CateringEFCore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TypeOfMeasurementController : ControllerBase
    {
        private readonly ITypeOfMeasurementBL typeOfMeasurementBL;

        public TypeOfMeasurementController(ITypeOfMeasurementBL _typeOfMeasurementBL)
        {
            this.typeOfMeasurementBL = _typeOfMeasurementBL;
        }

        [HttpGet("TypeOfMeasurements")]
        public async Task<List<TblTypesOfMeasurements>> GetAll()
        {
            return await typeOfMeasurementBL.GetAllMeasurementsAsync();
        }

        [HttpGet("TypeOfMeasurementById")]
        public async Task<TblTypesOfMeasurements> GetMeasurementById(int id)
        {
            return await typeOfMeasurementBL.GetMeasurementAsync(id);
        }

        [HttpPost("InsertTypeOfMeasurement")]
        public async Task AddCategory(TblTypesOfMeasurements typeOfMeasurement)
        {
            await typeOfMeasurementBL.InsertMeasurementsAsync(typeOfMeasurement);
        }

        [HttpPut("UpdateTypeOfMeasurement")]
        public async Task UpdateCategory(TblTypesOfMeasurements typeOfMeasurement)
        {
            await typeOfMeasurementBL.UpdateMeasurementsAsync(typeOfMeasurement);
        }

        [HttpDelete("DeleteTypeOfMeasurement")]
        public async Task DeleteCategory(int id)
        {
            await typeOfMeasurementBL.DeleteMeasurementsAsync(id);
        }
    }
}
