using DAL;
using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class RecipeBL : IRecipeBL
    {
        private readonly IRecipeDL RecipeDL;

        public RecipeBL(IRecipeDL _RecipeDL)
        {
            this.RecipeDL = _RecipeDL;
        }

        public async Task DeleteRecipeAsync(int id, int managerId)
        {

            await RecipeDL.DeleteRecipeAsync(id, managerId);
        }

        public async Task<List<RecipeDTO>> GetRecipesAsync(int managerId)
        {
            return await RecipeDL.GetRecipesAsync(managerId);
        }

        public async Task<TblRecipes> GetRecipeAsync(int id, int managerId)
        {
            return await RecipeDL.GetRecipeAsync(id, managerId);
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
