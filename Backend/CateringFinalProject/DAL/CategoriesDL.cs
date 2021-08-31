using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL
{
    public class CategoriesDL : ICategoriesDL
    {
        private readonly CateringDBContext db;

        public CategoriesDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        //מחיקת קטגוריה
        public async Task DeleteCategoryAsync(int id)
        {
            db.TblCategories.Remove(db.TblCategories.FirstOrDefault(c=> c.CategoryId == id));
            await db.SaveChangesAsync();
        }
        //החזרת כל הקטגוריות
        public async Task<List<TblCategories>> GetAllCategoriesAsync()
        {
            return await db.TblCategories.ToListAsync();
        }
        //החזרת קטגוריה לפי מזהה מסוים
        public async Task<TblCategories> GetCategoryAsync(int id)
        {
            return await db.TblCategories.FirstOrDefaultAsync(c => c.CategoryId == id);
        }
        //הוספה לטבלת קטגוריות
        public async Task InsertCategoryAsync(TblCategories c)
        {
            db.TblCategories.Add(c);
            await db.SaveChangesAsync();
        }
        //עדכון קטגוריה
        public async Task UpdateCategoryAsync(TblCategories c)
        {
            TblCategories cUpdate = db.TblCategories.FirstOrDefault(c1 => c1.CategoryId == c.CategoryId);
            if (cUpdate!=null)
            {
                cUpdate.CategoryName = c.CategoryName;
                cUpdate.PreOrderTime = c.PreOrderTime;
                await db.SaveChangesAsync();
            }
        }
    }
}
