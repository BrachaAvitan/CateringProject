using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace BL
{
   public class TypeOfMeasurementBL : ITypeOfMeasurementBL
    {
        private readonly ITypeOfMeasurement‏DL typeOfMeasurementIdDL;

        public TypeOfMeasurementBL(ITypeOfMeasurement‏DL _typeOfMeasurementIdDL)
        {
            this.typeOfMeasurementIdDL = _typeOfMeasurementIdDL;
        }
        public async Task DeleteMeasurementsAsync(int id)
        {
             await typeOfMeasurementIdDL.DeleteMeasurementsAsync(id);
        }

        public async Task<List<TblTypesOfMeasurements>> GetAllMeasurementsAsync()
        {
            return await typeOfMeasurementIdDL.GetAllMeasurementsAsync();
        }

        public async  Task<TblTypesOfMeasurements> GetMeasurementAsync(int id)
        {
            
            return await typeOfMeasurementIdDL.GetMeasurementAsync(id);
        }

        public async Task InsertMeasurementsAsync(TblTypesOfMeasurements t)
        {
            await typeOfMeasurementIdDL.InsertMeasurementsAsync(t);
        }

        public async Task UpdateMeasurementsAsync(TblTypesOfMeasurements t)
        {
            await typeOfMeasurementIdDL.UpdateMeasurementsAsync(t);
        }
    }
}
