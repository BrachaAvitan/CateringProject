using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entity.DTO;
using Entity.Models;

namespace DAL
{
    public interface ICategoriesDL
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
