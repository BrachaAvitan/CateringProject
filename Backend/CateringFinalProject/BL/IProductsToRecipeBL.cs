using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IProductsToRecipeBL
    {
        //Get All Product
        Task<List<TblProductsToRecipe>> GetAllAsync();

        //Get Product By Id
        Task<TblProductsToRecipe> GetProductToRecipeAsync(int id);

        //Insert Product
        Task InsertProductToRecipeAsync(TblProductsToRecipe product);

        //Update Product
        Task UpdateProductToRecipeAsync(TblProductsToRecipe product);

        //Delete Product
        Task DeleteProductToRecipeAsync(int id);
    }
}
