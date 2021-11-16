using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class doesTypeBL : IdoesTypeBL
    {
        private readonly IdoesTypeDL doesTypeDL;
        public doesTypeBL(IdoesTypeDL _idoesTypeDL)
        {
            this.doesTypeDL = _idoesTypeDL;
        }
        public async Task DeleteDoesTypeAsync(int id)
        {
            await doesTypeDL.DeleteDoesTypeAsync(id);
        }

        public async Task<List<TblDoseType>> GetAllDoesTypeAsync()
        {
            return await doesTypeDL.GetAllDoesTypeAsync();
        }

        public async Task<TblDoseType> GetDoesTypeAsync(int id)
        {
            return await doesTypeDL.GetDoesTypeAsync(id);
        }

        public async Task InsertDoesTypeAsync(TblDoseType d)
        {
            await doesTypeDL.InsertDoesTypeAsync(d);
        }

        public async Task UpdateDoesTypeAsync(TblDoseType d)
        {
            await doesTypeDL.UpdateDoesTypeAsync(d);
        }
    }
}
