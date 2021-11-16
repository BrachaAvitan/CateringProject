using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IMenuTypesDL
    {
        //קבלת כל סוגי התפריטים
        Task<List<TblMenuTypes>> GetAllMenuTypesAsync();
        //קבלת סוג תפריט לפי מזהה סוג תפריט
        Task<TblMenuTypes> GetMenuTypeAsync(int id);
        //הוספה לטבלת סוגי תפריטים
        Task InsertMenuTypeAsync(TblMenuTypes m);
        //עדכון סוג תפריט
        Task UpdateMenuTypeAsync(TblMenuTypes m);
        //מחיקת סוג תפריט
        Task DeleteMenuTypeAsync(int id);
    }
}
