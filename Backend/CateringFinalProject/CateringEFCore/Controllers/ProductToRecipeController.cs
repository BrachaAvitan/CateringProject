using BL;
using Entity.DTO;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CateringEFCore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductToRecipeController : ControllerBase
    {
        private readonly IProductsToRecipeBL productsToRecipeBL;

        public ProductToRecipeController(IProductsToRecipeBL _productsToRecipeBL)
        {
            this.productsToRecipeBL = _productsToRecipeBL;
        }

        [HttpGet("ProductsToRecipe")]
        public async Task<List<ProductToRecipeDTO>> GetAll(int recipeId, int managerId)
        {
            return await productsToRecipeBL.GetProductsToRecipeAsync(recipeId, managerId);
        }

        [HttpGet("ProductToRecipeById")]
        public async Task<TblProductsToRecipe> GetProductToRecipeById(int id, int managerId)
        {
            return await productsToRecipeBL.GetProductToRecipeAsync(id, managerId);
        }

        [HttpPost("InsertProductToRecipe")]
        public async Task InsertProductToRecipe(TblProductsToRecipe product)
        {
            await productsToRecipeBL.InsertProductToRecipeAsync(product);
        }

        [HttpPut("UpdateProductToRecipe")]
        public async Task UpdateProductToRecipe(TblProductsToRecipe product)
        {
            await productsToRecipeBL.UpdateProductToRecipeAsync(product);
        }

        [HttpDelete("DeleteProductToRecipe")]
        public async Task DeleteProductToRecipe(int id, int managerId)
        {
            await productsToRecipeBL.DeleteProductToRecipeAsync(id, managerId);
        }
    }
}
