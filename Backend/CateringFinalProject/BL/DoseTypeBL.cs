using DAL;
using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class DoseTypeBL : IDoseTypeBL
    {
        private readonly IDoseTypeDL doseTypeDL;

        public DoseTypeBL(IDoseTypeDL _doesTypeDL)
        {
            this.doseTypeDL = _doesTypeDL;
        }
        public async Task DeleteDoseTypeAsync(int id)
        {
            await doseTypeDL.DeleteDoseTypeAsync(id);
        }

        public async Task<List<DoseTypeDTO>> GetDoseTypesAsync()
        {
            return await doseTypeDL.GetDoseTypesAsync();
        }

        public async Task<TblDoseType> GetDoseTypeAsync(int id)
        {
            return await doseTypeDL.GetDoseTypeAsync(id);
        }

        public async Task InsertDoseTypeAsync(TblDoseType d)
        {
            await doseTypeDL.InsertDoseTypeAsync(d);
        }

        public async Task UpdateDoseTypeAsync(TblDoseType d)
        {
            await doseTypeDL.UpdateDoseTypeAsync(d);
        }
    }
}
