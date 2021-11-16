using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace BL
{
   public class TypeOfMeasurementId‏BL : ITypeOfMeasurementIdBL
    {
        private readonly ITypeOfMeasurementIdDL typeOfMeasurementIdDL;
        public TypeOfMeasurementId‏BL(ITypeOfMeasurementIdDL _typeOfMeasurementIdDL)
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

        public async Task InsertMeasurementsAsync(TblTypesOfMeasurements c)
        {
            await typeOfMeasurementIdDL.InsertMeasurementsAsync(c);
        }

        public async Task UpdateMeasurementsAsync(TblTypesOfMeasurements c)
        {
            await typeOfMeasurementIdDL.UpdateMeasurementsAsync(c);
        }
    }
}
