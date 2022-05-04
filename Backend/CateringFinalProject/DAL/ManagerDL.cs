using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.DTO;
using Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class ManagerDL : IManagerDL
    {
        private readonly CateringDBContext db;

        public ManagerDL(CateringDBContext _db)
        {
            this.db = _db;
        }

        public async Task DeleteManagerAsync(int id)
        {
            db.TblManager.Remove(db.TblManager.FirstOrDefault(m => m.ManagerId == id));
            await db.SaveChangesAsync();
        }

        public async Task<List<TblManager>> GetAllAsync()
        {
            return await db.TblManager.ToListAsync();
        }

        public async Task<TblManager> GetManagerAsync(int id)
        {
            return await db.TblManager.FirstOrDefaultAsync(m => m.ManagerId == id);
        }

        public async Task<bool> GetIsUserNameExistAsync(string userName)
        {
            TblManager m =  await db.TblManager.FirstOrDefaultAsync(m => m.UserName.Equals(userName));
            if(m==null)
               return false;
            return true;
        }

        public async Task InsertManagerAsync(TblManager manager)
        {
            db.TblManager.Add(manager);
            await db.SaveChangesAsync();
        }

        public async Task<TblManager> Login(string name, string password)
        {
            return await db.TblManager.FirstOrDefaultAsync(m => m.UserName.Equals(name) && m.Password.Equals(password));
        }

        public async Task UpdateManagerAsync(TblManager manager)
        {
            TblManager mUpdate = db.TblManager.FirstOrDefault(m => m.ManagerId == manager.ManagerId);

            if (mUpdate != null)
            {
                mUpdate.FullName = manager.FullName;
                mUpdate.UserName = manager.UserName;
                mUpdate.Password = manager.Password;
                mUpdate.Email = manager.Email;
                mUpdate.PhoneNumber = manager.PhoneNumber;
                mUpdate.Active = manager.Active;
                mUpdate.Blocked = manager.Blocked;
                await db.SaveChangesAsync();
            }
        }
    }
}
