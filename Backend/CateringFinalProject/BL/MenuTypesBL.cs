using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class MenuTypesBL : IMenuTypesBL
    {
        private readonly IMenuTypesDL menuTypesDL;

        public MenuTypesBL(IMenuTypesDL _menuTypesDL)
        {
            this.menuTypesDL = _menuTypesDL;
        }

        public async Task DeleteMenuTypeAsync(int id)
        {
            await menuTypesDL.DeleteMenuTypeAsync(id);
        }

        public async Task<List<TblMenuTypes>> GetAllMenuTypesAsync()
        {
            return await menuTypesDL.GetAllMenuTypesAsync();
        }

        public async Task<TblMenuTypes> GetMenuTypeAsync(int id)
        {
            return await menuTypesDL.GetMenuTypeAsync(id);
        }

        public async Task InsertMenuTypeAsync(TblMenuTypes m)
        {
            await menuTypesDL.InsertMenuTypeAsync(m);
        }

        public async Task UpdateMenuTypeAsync(TblMenuTypes m)
        {
            await menuTypesDL.UpdateMenuTypeAsync(m);
        }
    }
}
