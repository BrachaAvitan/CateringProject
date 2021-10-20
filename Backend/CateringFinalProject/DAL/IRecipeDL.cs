using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IRecipeDL
    {
        //Get All Recipes
        Task<List<TblRecipes>> GetAllAsync();

        //Get Recipe By Id
        Task<TblRecipes> GetRecipeAsync(int id);

        //Insert Recipe
        Task InsertRecipeAsync(TblRecipes recipe);

        //Update Recipe
        Task UpdateRecipeAsync(TblRecipes recipe);

        //Delete Recipe
        Task DeleteRecipeAsync(int id);
    }
}
