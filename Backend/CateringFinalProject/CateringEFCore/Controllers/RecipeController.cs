using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CateringEFCore.Controllers
{
    //לא לשכוח להעלות את זה לגיט
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
        public async Task<List<TblRecipes>> GetAll()
        {
            return await recipeBL.GetAllAsync();
        }

        [HttpGet("RecipeById")]
        public async Task<TblRecipes> GetRecipeById(int id)
        {
            return await recipeBL.GetRecipeAsync(id);
        }

        [HttpPost("InsertRecipe")]
        public async Task InsertRecipe(TblRecipes recipe)
        {
            await recipeBL.InsertRecipeAsync(recipe);
        }

        [HttpPut("UpdateRecipe")]
        public async Task UpdateTool(TblRecipes recipe)
        {
            await recipeBL.UpdateRecipeAsync(recipe);
        }

        [HttpDelete("DeleteRecipe")]
        public async Task DeleteRecipe(int id)
        {
            await recipeBL.DeleteRecipeAsync(id);
        }
    }
}
