using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entity.Models;

namespace DAL
{
   public  interface ITypeOfMeasurement‏DL
    {
        //קבלת כל סוגי המדידות
        Task<List<TblTypesOfMeasurements>> GetAllMeasurementsAsync();
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

    

