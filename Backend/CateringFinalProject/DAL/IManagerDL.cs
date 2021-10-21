using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IManagerDL
    {
        //Get All Manager
        Task<List<TblManager>> GetAllAsync();

        //Get Manager by id
        Task<TblManager> GetManagerAsync(int id);

        //Get Manager for login by name and password
        Task<TblManager> Login(string name, string password);

        //Insert Manager
        Task InsertManagerAsync(TblManager manager);

        //Update Manager
        Task UpdateManagerAsync(TblManager manager);

        //Delete Manager
        Task DeleteManagerAsync(int id);
    }
}
