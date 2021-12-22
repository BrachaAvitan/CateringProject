using DAL;
using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductsToRecipeBL : IProductsToRecipeBL
    {
        private readonly IProductsToRecipeDL productsToRecipeDL;

        public ProductsToRecipeBL(IProductsToRecipeDL _productsToRecipeDL)
        {
            this.productsToRecipeDL = _productsToRecipeDL;
        }
        public async Task DeleteProductToRecipeAsync(int id, int managerId)
        {
            await productsToRecipeDL.DeleteProductToRecipeAsync(id, managerId);
        }

        public async Task<List<ProductToRecipeDTO>> GetProductsToRecipeAsync(int recipeId, int managerId)
        {
            return await productsToRecipeDL.GetProductsToRecipeAsync(recipeId, managerId);
        }

        public async Task<TblProductsToRecipe> GetProductToRecipeAsync(int id, int managerId)
        {
            return await productsToRecipeDL.GetProductToRecipeAsync(id, managerId);
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
