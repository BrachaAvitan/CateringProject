using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class RecipeBL : IRecipeBL
    {
        IRecipeDL RecipeDL;

        public RecipeBL(IRecipeDL _RecipeDL)
        {
            this.RecipeDL = _RecipeDL;
        }

        public async Task DeleteRecipeAsync(int id)
        {

            await RecipeDL.DeleteRecipeAsync(id);
        }

        public async Task<List<TblRecipes>> GetAllAsync()
        {
            return await RecipeDL.GetAllAsync();
        }

        public async Task<TblRecipes> GetRecipeAsync(int id)
        {
            return await RecipeDL.GetRecipeAsync(id);
        }

        public async Task InsertRecipeAsync(TblRecipes recipe)
        {
            await RecipeDL.InsertRecipeAsync(recipe);
        }

        public async Task UpdateRecipeAsync(TblRecipes recipe)
        {
            await RecipeDL.UpdateRecipeAsync(recipe);
        }
    }
}
