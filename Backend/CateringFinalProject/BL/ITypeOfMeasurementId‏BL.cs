using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public interface ITypeOfMeasurementId‏BL
    {
        //קבלת כל סוגי המדידות
        Task<List<TblTypesOfMeasurements>> GetAllMeasurementsAsync();
        //קבלת סוג לפי מזהה מדידה
        Task<TblTypesOfMeasurements> GetMeasurementAsync(int id);
        //הוספה לטבלת מדידות
        Task InsertMeasurementsAsync(TblTypesOfMeasurements c);
        //עדכון סוג מדידה
        Task UpdateMeasurementsAsync(TblTypesOfMeasurements c);
        //מחיקת סוג מדידה
        Task DeleteMeasurementsAsync(int id);
    }
}
