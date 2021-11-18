using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IDoseTypeBL
    {
        //קבלת כל סוגי מנות
        Task<List<TblDoseType>> GetDoseTypesAsync();
        //קבלת סוג מנה לפי מזהה סוג מנה
        Task<TblDoseType> GetDoseTypeAsync(int id);
        //הוספה לטבלת סוגי מנה
        Task InsertDoseTypeAsync(TblDoseType d);
        //עדכון סוג מנה
        Task UpdateDoseTypeAsync(TblDoseType d);
        //מחיקת סוג מנה
        Task DeleteDoseTypeAsync(int id);
    }
}
