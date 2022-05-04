using BL;
using CateringEFCore.Classes;
using Classes;
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
    public class RecipeToOrderController : ControllerBase
    {
        public readonly IRecipesToOrderBL recipesToOrderBL;

        public RecipeToOrderController(IRecipesToOrderBL _recipesToOrderBL)
        {
            this.recipesToOrderBL = _recipesToOrderBL;
        }

        [HttpGet("RecipesToOrder")]
        public async Task<List<RecipesToOrderDTO>> GetAllAsync(int id, int managerId)
        {
            return await recipesToOrderBL.GetRecipesToOrderAsync(id, managerId);
        }

        [HttpGet("RecipesOfOneEvent")]
        public async Task<List<TblRecipesToOrder>> GetRecipesOfOneEvent(int id, int managerId)
        {
            return await recipesToOrderBL.GetRecipesOfOneEventAsync(id, managerId);
        }

        [HttpGet("Recipes")]
        public async Task<List<RecipeDTO>> GetRecipes(int eventId, int managerId)
        {
            return await recipesToOrderBL.GetRecipes(eventId, managerId);
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

        [HttpPost("ProduceDocument")]
        public async Task<List<ProductManagementDTO>> ProduceDocument(int managerId, RangeDate rangeDate)
        {
            return await recipesToOrderBL.InventoryCalculation(managerId, rangeDate);
        }
    }
}

