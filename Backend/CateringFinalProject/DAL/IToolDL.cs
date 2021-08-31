using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IToolDL
    {
        //Get All Tools
        Task<List<TblTools>> GetAllAsync();

        //Get Tool By Id
        Task<TblTools> GetToolAsync(int id);

        //Insert Tool
        Task InsertToolAsync(TblTools tool);

        //Update Tool
        Task UpdateToolAsync(TblTools tool);

        //Delete Tool
        Task DeleteToolAsync(int id);
    }
}
