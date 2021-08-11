using Entity.Modules;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL
{
    public interface ICategoriesBL
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
