using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IProductsToRecipeDL
    {
        //Get All ProductsToRecipe By recipeId & managerId
        Task<List<TblProductsToRecipe>> GetProductsToRecipeAsync(int recipeId, int managerId);

        //Get ProductToRecipe By Id & managerId
        Task<TblProductsToRecipe> GetProductToRecipeAsync(int id, int managerId);

        //Insert ProductToRecipe
        Task InsertProductToRecipeAsync(TblProductsToRecipe product);

        //Update ProductToRecipe
        Task UpdateProductToRecipeAsync(TblProductsToRecipe product);

        //Delete ProductToRecipe
        Task DeleteProductToRecipeAsync(int id, int managerId);
    }
}
