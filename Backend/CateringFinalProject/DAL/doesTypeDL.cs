using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class doesTypeDL : IdoesTypeDL
    {
        private readonly CateringDBContext db;
        public doesTypeDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        //מחיקת סוג מנה
        public async Task DeleteDoesTypeAsync(int id)
        {
            db.TblDoseType.Remove(db.TblDoseType.FirstOrDefault(d => d.DoseTypeId == id));
            await db.SaveChangesAsync();
        }
        //קבלת כל סוגי המנות
        public async Task<List<TblDoseType>> GetAllDoesTypeAsync()
        {
            return await db.TblDoseType.ToListAsync();
        }
        //קבלת סוג מנה לפי מזהה
        public async Task<TblDoseType> GetDoesTypeAsync(int id)
        {
            return await db.TblDoseType.FirstOrDefaultAsync(d => d.DoseTypeId == id);
        }

        //הוספת סוג מנה
        public async Task InsertDoesTypeAsync(TblDoseType d)
        {
            db.TblDoseType.Add(d);
            await db.SaveChangesAsync();
        }
        //עידכון סוג מנה 
        public async Task UpdateDoesTypeAsync(TblDoseType d)
        {
            TblDoseType dUpdate = db.TblDoseType.FirstOrDefault(d1 => d1.DoseTypeId == d.DoseTypeId);
            if (dUpdate != null)
            {
                dUpdate.DoseName = d.DoseName;
                await db.SaveChangesAsync();
            }
        }
    }
}
