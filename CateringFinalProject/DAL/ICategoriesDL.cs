using System;
using System.Collections.Generic;
using System.Text;
using Entity.Modules;

namespace DAL
{
    public interface ICategoriesDL
    {
        //קבלת כל הקטגוריות
        List<TblCategories> GetAllCategories();
        //קבלת קטגוריה לפי מזהה קטגוריה
        TblCategories GetCategory(int id);
        //הוספה לטבלת קטגוריה
        void InsertCategory(TblCategories c);
        //עדכון קטגוריה
        void UpdateCategory(TblCategories c);
        //מחיקת קטגוריה
        void DeleteCategory(int id);
    }
}
