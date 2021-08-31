using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public class CategoriesBL : ICategoriesBL
    {
        private readonly ICategoriesDL categoriesDL;

        public CategoriesBL(ICategoriesDL _categoriesDL)
        {
            this.categoriesDL = _categoriesDL;
        }

        public async Task DeleteCategoryAsync(int id)
        {
            await categoriesDL.DeleteCategoryAsync(id);
        }

        public async Task<List<TblCategories>> GetAllCategoriesAsync()
        {
            return await categoriesDL.GetAllCategoriesAsync();
        }

        public async Task<TblCategories> GetCategoryAsync(int id)
        {
            return await categoriesDL.GetCategoryAsync(id);
        }

        public async Task InsertCategoryAsync(TblCategories c)
        {
            await categoriesDL.InsertCategoryAsync(c);
        }

        public async Task UpdateCategoryAsync(TblCategories c)
        {
            await categoriesDL.UpdateCategoryAsync(c);
        }
    }
}
