using Entity.Modules;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class CategoriesDL : ICategoriesDL
    {
        CateringDBContext db;

        public CategoriesDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        //מחיקת קטגוריה
        public void DeleteCategory(int id)
        {
            db.TblCategories.Remove(db.TblCategories.FirstOrDefault(c=> c.CategoryId == id));
            db.SaveChanges();
        }
        //החזרת כל הקטגוריות
        public List<TblCategories> GetAllCategories()
        {
            return db.TblCategories.ToList();
        }
        //החזרת קטגוריה לפי מזהה מסוים
        public TblCategories GetCategory(int id)
        {
            return db.TblCategories.FirstOrDefault(c => c.CategoryId == id);
        }
        //הוספה לטבלת קטגוריות
        public void InsertCategory(TblCategories c)
        {
            db.TblCategories.Add(c);
            db.SaveChanges();
        }
        //עדכון קטגוריה
        public void UpdateCategory(TblCategories c)
        {
            TblCategories cUpdate = db.TblCategories.FirstOrDefault(c1 => c1.CategoryId == c.CategoryId);
            if (cUpdate!=null)
            {
                cUpdate.CategoryName = c.CategoryName;
                cUpdate.PreOrderTime = c.PreOrderTime;
            }
            db.SaveChanges();
        }
    }
}
