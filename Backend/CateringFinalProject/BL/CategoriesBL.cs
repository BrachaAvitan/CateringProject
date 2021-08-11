using DAL;
using Entity.Modules;
using System;
using System.Collections.Generic;

namespace BL
{
    public class CategoriesBL : ICategoriesBL
    {
        ICategoriesDL categoriesDL;

        public CategoriesBL(ICategoriesDL _categoriesDL)
        {
            this.categoriesDL = _categoriesDL;
        }

        public void DeleteCategory(int id)
        {
            categoriesDL.DeleteCategory(id);
        }

        public List<TblCategories> GetAllCategories()
        {
            return categoriesDL.GetAllCategories();
        }

        public TblCategories GetCategory(int id)
        {
            return categoriesDL.GetCategory(id);
        }

        public void InsertCategory(TblCategories c)
        {
            categoriesDL.InsertCategory(c);
        }

        public void UpdateCategory(TblCategories c)
        {
            categoriesDL.UpdateCategory(c);
        }
    }
}
