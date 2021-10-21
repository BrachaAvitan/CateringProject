using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ManagerBL : IManagerBL
    {
        private readonly IManagerDL managerDL;

        public ManagerBL(IManagerDL _managerDL)
        {
            this.managerDL = _managerDL;
        }

        public async Task DeleteManagerAsync(int id)
        {
            await managerDL.DeleteManagerAsync(id);
        }

        public async Task<List<TblManager>> GetAllAsync()
        {
            return await managerDL.GetAllAsync();
        }

        public async Task<TblManager> GetManagerAsync(int id)
        {
            return await managerDL.GetManagerAsync(id);
        }

        public async Task InsertManagerAsync(TblManager manager)
        {
            await managerDL.InsertManagerAsync(manager);
        }

        public async Task<TblManager> Login(string name, string password)
        {
            return await managerDL.Login(name, password);
        }

        public async Task UpdateManagerAsync(TblManager manager)
        {
            await managerDL.UpdateManagerAsync(manager);
        }
    }
}
