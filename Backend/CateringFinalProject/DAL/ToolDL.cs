using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ToolDL : IToolDL
    {
        private readonly CateringDBContext db;

        public ToolDL(CateringDBContext _db)
        {
            this.db = _db;
        }

        public async Task DeleteToolAsync(int id)
        {
            db.TblTools.Remove(await db.TblTools.FirstOrDefaultAsync(t => t.ToolId == id));
            await db.SaveChangesAsync();
        }

        public async Task<List<TblTools>> GetAllAsync()
        {
            return await db.TblTools.ToListAsync();
        }

        public async Task<TblTools> GetToolAsync(int id)
        {
            return await db.TblTools.FirstOrDefaultAsync(t => t.ToolId == id);
        }

        public async Task InsertToolAsync(TblTools tool)
        {
            await db.TblTools.AddAsync(tool);
            await db.SaveChangesAsync();
        }

        public async Task UpdateToolAsync(TblTools tool)
        {
            TblTools tUpdate = await db.TblTools.FirstOrDefaultAsync(t => t.ToolId == tool.ToolId);

            if (tUpdate!=null)
            {
                tUpdate.ToolName = tool.ToolName;
                tUpdate.OneTimeQuantity = tool.OneTimeQuantity;
                tUpdate.AmountOfGlass = tool.AmountOfGlass;
                await db.SaveChangesAsync();
            }
        }
    }
}
