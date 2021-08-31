using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ToolBL : IToolBL
    {
        private readonly IToolDL toolDL;

        public ToolBL(IToolDL _toolDL)
        {
            this.toolDL = _toolDL;
        }

        public async Task DeleteToolAsync(int id)
        {
            await toolDL.DeleteToolAsync(id);
        }

        public async Task<List<TblTools>> GetAllAsync()
        {
            return await toolDL.GetAllAsync();
        }

        public async Task<TblTools> GetToolAsync(int id)
        {
            return await toolDL.GetToolAsync(id);
        }

        public async Task InsertToolAsync(TblTools tool)
        {
            await toolDL.InsertToolAsync(tool);
        }

        public async Task UpdateToolAsync(TblTools tool)
        {
            await toolDL.UpdateToolAsync(tool);
        }
    }
}
