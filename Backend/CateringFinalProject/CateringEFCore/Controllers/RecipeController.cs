using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using Entity.DTO;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CateringEFCore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public readonly IRecipeBL recipeBL;

        public RecipeController(IRecipeBL _recipeBL)
        {
            this.recipeBL = _recipeBL;
        }

        [HttpGet("Recipes")]
        public async Task<List<RecipeDTO>> GetAll(int managerId)
        {
            return await recipeBL.GetRecipesAsync(managerId);
        }

        [HttpGet("RecipeById")]
        public async Task<TblRecipes> GetRecipeById(int id, int managerId)
        {
            return await recipeBL.GetRecipeAsync(id, managerId);
        }

        [HttpPost("InsertRecipe")]
        public async Task<int> InsertRecipe(TblRecipes recipe)
        {
            return await recipeBL.InsertRecipeAsync(recipe);
        }

        [HttpPut("UpdateRecipe")]
        public async Task UpdateTool(TblRecipes recipe)
        {
            await recipeBL.UpdateRecipeAsync(recipe);
        }

        [HttpDelete("DeleteRecipe")]
        public async Task DeleteRecipe(int id, int managerId)
        {
            await recipeBL.DeleteRecipeAsync(id, managerId);
        }
    }
}
