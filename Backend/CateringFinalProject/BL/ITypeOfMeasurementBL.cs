using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public interface ITypeOfMeasurementBL
    {
        //קבלת כל סוגי המדידות
        Task<List<TypeOfMeasurementDTO>> GetAllMeasurementsAsync();
        //קבלת סוג לפי מזהה מדידה
        Task<TblTypesOfMeasurements> GetMeasurementAsync(int id);
        //הוספה לטבלת מדידות
        Task InsertMeasurementsAsync(TblTypesOfMeasurements t);
        //עדכון סוג מדידה
        Task UpdateMeasurementsAsync(TblTypesOfMeasurements t);
        //מחיקת סוג מדידה
        Task DeleteMeasurementsAsync(int id);
    }
}
