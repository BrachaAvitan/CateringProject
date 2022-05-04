using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface ICategoriesBL
    {
        //קבלת כל הקטגוריות
        Task<List<CategoryDTO>> GetAllCategoriesAsync();
        //קבלת קטגוריה לפי מזהה קטגוריה
        Task<TblCategories> GetCategoryAsync(int id);
        //הוספה לטבלת קטגוריה
        Task InsertCategoryAsync(TblCategories c);
        //עדכון קטגוריה
        Task UpdateCategoryAsync(TblCategories c);
        //מחיקת קטגוריה
        Task DeleteCategoryAsync(int id);
    }
}
