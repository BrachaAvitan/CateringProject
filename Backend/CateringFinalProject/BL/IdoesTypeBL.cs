using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IdoesTypeBL
    {
        //קבלת כל הקטגוריות
        Task<List<TblDoseType>> GetAllDoesTypeAsync();
        //קבלת קטגוריה לפי מזהה קטגוריה
        Task<TblDoseType> GetDoesTypeAsync(int id);
        //הוספה לטבלת קטגוריה
        Task InsertDoesTypeAsync(TblDoseType d);
        //עדכון קטגוריה
        Task UpdateDoesTypeAsync(TblDoseType d);
        //מחיקת קטגוריה
        Task DeleteDoesTypeAsync(int id);
    }
}
