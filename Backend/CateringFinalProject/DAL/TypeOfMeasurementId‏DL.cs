using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class TypeOfMeasurementId‏DL : ITypeOfMeasurementIdDL
    {
        private readonly CateringDBContext db;
        public TypeOfMeasurementId‏DL(CateringDBContext _db)
        {
            this.db = _db;
        }
        //מחיקת קטגוריה
        public async Task DeleteMeasurementsAsync(int id)
        {
            db.TblTypesOfMeasurements.Remove(db.TblTypesOfMeasurements.FirstOrDefault(t => t.TypeOfMeasurementId == id));
            await db.SaveChangesAsync();
        }
        //קבלת כל כמויות המדידה
        public async Task<List<TblTypesOfMeasurements>> GetAllMeasurementsAsync()
        {
            return await db.TblTypesOfMeasurements.ToListAsync();
        }
        //  קבלת כמות מדידה לפי מזהה
        public async Task<TblTypesOfMeasurements> GetMeasurementAsync(int id)
        {
            return await db.TblTypesOfMeasurements.FirstOrDefaultAsync(t => t.TypeOfMeasurementId == id);
        }
        //הוספה לטבלת סוגי מדידות 
        public async Task InsertMeasurementsAsync(TblTypesOfMeasurements c)
        {
            db.TblTypesOfMeasurements.Add(c);
            await db.SaveChangesAsync();
        }
        //עידכון טבלת סוגי מדידות
        public async Task UpdateMeasurementsAsync(TblTypesOfMeasurements t)
        {
            TblTypesOfMeasurements tUpdate = db.TblTypesOfMeasurements.FirstOrDefault(t1 => t1.TypeOfMeasurementId == t.TypeOfMeasurementId);
            if (tUpdate != null)
            {
                tUpdate.TypeOfMeasurement = t.TypeOfMeasurement;
                await db.SaveChangesAsync();
            }
        }
    }
}
