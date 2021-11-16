using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class productsToRecipeBL : IProductsToRecipeBL
    {
        private readonly IProductsToRecipeDL productsToRecipeDL;
        public productsToRecipeBL(IProductsToRecipeDL _productsToRecipeDL)
        {
            this.productsToRecipeDL = _productsToRecipeDL;
        }
        public async Task DeleteProductToRecipeAsync(int id)
        {
            await productsToRecipeDL.DeleteProductToRecipeAsync(id);
        }

        public async Task<List<TblProductsToRecipe>> GetAllAsync()
        {
            return await productsToRecipeDL.GetAllAsync();
        }

        public async Task<TblProductsToRecipe> GetProductToRecipeAsync(int id)
        {
            return await productsToRecipeDL.GetProductToRecipeAsync(id);
        }

        public async Task InsertProductToRecipeAsync(TblProductsToRecipe product)
        {
            await productsToRecipeDL.InsertProductToRecipeAsync(product);
        }

        public async Task UpdateProductToRecipeAsync(TblProductsToRecipe product)
        {
            await productsToRecipeDL.UpdateProductToRecipeAsync(product);
        }
    }
}
