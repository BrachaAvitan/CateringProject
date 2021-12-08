using Entity.Converter;
using Entity.DTO;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class MenuTypesDL : IMenuTypesDL
    {
        private readonly CateringDBContext db;

        public MenuTypesDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        //מחיקת סוג תפריט
        public async Task DeleteMenuTypeAsync(int id)
        {
            db.TblMenuTypes.Remove(db.TblMenuTypes.FirstOrDefault(m => m.MenuId == id));
            await db.SaveChangesAsync();
        }
        //קבלת כל סוגי תפריט
        public async Task<List<MenuTypeDTO>> GetAllMenuTypesAsync()
        {
            return await db.TblMenuTypes.Select(m => MenuTypeConverter.convertToMenuTypeDTO(m)).ToListAsync();
        }
        //קבלת סוג תפריט לפי מזהה תפריט
        public async Task<TblMenuTypes> GetMenuTypeAsync(int id)
        {
            return await db.TblMenuTypes.FirstOrDefaultAsync(m => m.MenuId == id);
        }
        //הוספת סוג תפריט
        public async Task InsertMenuTypeAsync(TblMenuTypes m)
        {
            db.TblMenuTypes.Add(m);
            await db.SaveChangesAsync();
        }
        //עדכון סוג תפריט
        public async Task UpdateMenuTypeAsync(TblMenuTypes m)
        {
            TblMenuTypes mUpdate = db.TblMenuTypes.FirstOrDefault(m1 => m1.MenuId == m.MenuId);
            if (mUpdate != null)
            {
                mUpdate.MenuName = m.MenuName;
                await db.SaveChangesAsync();
            }
        }
    }
}
