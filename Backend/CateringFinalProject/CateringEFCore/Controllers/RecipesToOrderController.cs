using BL;
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
    public class RecipesToOrderController : ControllerBase
    {
        public readonly IRecipesToOrderBL recipesToOrderBL;

        public RecipesToOrderController(IRecipesToOrderBL _recipesToOrderBL)
        {
            this.recipesToOrderBL = _recipesToOrderBL;
        }

        [HttpGet("RecipesToOrder")]
        public async Task<List<TblRecipesToOrder>> GetAllAsync()
        {
            return await recipesToOrderBL.GetAllAsync();
        }

        [HttpGet("RecipeToOrderById")]
        public async Task<TblRecipesToOrder> GetRecipeById(int id)
        {
            return await recipesToOrderBL.GetRecipeToOrderAsync(id);
        }

        [HttpPost("InsertRecipeToOrder")]
        public async Task InsertRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            await recipesToOrderBL.InsertRecipeToOrderAsync(recipe);
        }

        [HttpPut("UpdateRecipeToOrder")]
        public async Task UpdateRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            await recipesToOrderBL.UpdateRecipeToOrderAsync(recipe);
        }

        [HttpDelete("DeleteRecipeToOrder")]
        public async Task DeleteRecipeToOrderAsync(int id)
        {
            await recipesToOrderBL.DeleteRecipeToOrderAsync(id);
        }
    }
}
