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
    public class TypeOfMeasurementDL : ITypeOfMeasurement‏DL
    {
        private readonly CateringDBContext db;
        public TypeOfMeasurementDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        //מחיקת סוג מדידה
        public async Task DeleteMeasurementsAsync(int id)
        {
            db.TblTypesOfMeasurements.Remove(db.TblTypesOfMeasurements.FirstOrDefault(t => t.TypeOfMeasurementId == id));
            await db.SaveChangesAsync();
        }
        //קבלת כל כמויות המדידה
        public async Task<List<TypeOfMeasurementDTO>> GetAllMeasurementsAsync()
        {
            return await db.TblTypesOfMeasurements.Select(m => TypeOfMeasurementConverter.convertToTypeOfMeasurementDTO(m)).ToListAsync();
        }
        //  קבלת כמות מדידה לפי מזהה
        public async Task<TblTypesOfMeasurements> GetMeasurementAsync(int id)
        {
            return await db.TblTypesOfMeasurements.FirstOrDefaultAsync(t => t.TypeOfMeasurementId == id);
        }
        //הוספה לטבלת סוגי מדידות 
        public async Task InsertMeasurementsAsync(TblTypesOfMeasurements t)
        {
            db.TblTypesOfMeasurements.Add(t);
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
