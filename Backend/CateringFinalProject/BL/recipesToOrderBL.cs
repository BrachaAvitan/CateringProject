using CateringEFCore.Classes;
using DAL;
using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class RecipesToOrderBL : IRecipesToOrderBL
    {
        private readonly IRecipesToOrderDL recipesToOrderDL;

        public RecipesToOrderBL(IRecipesToOrderDL _recipesToOrderDL)
        {
            this.recipesToOrderDL = _recipesToOrderDL;
        }

        public async Task DeleteRecipeToOrderAsync(int id)
        {
            await recipesToOrderDL.DeleteRecipeToOrderAsync(id);
        }

        public async Task<List<RecipesToOrderDTO>> GetRecipesToOrderAsync(int eventId, int managerId)
        {
            return await recipesToOrderDL.GetRecipesToOrderAsync(eventId, managerId);
        }

        public async Task<List<TblRecipesToOrder>> GetRecipesOfOneEventAsync(int eventId, int managerId)
        {
            return await recipesToOrderDL.GetRecipesOfOneEventAsync(eventId, managerId);
        }

        public async Task<List<RecipeDTO>> GetRecipes(int eventId, int managerId)
        {
            return await recipesToOrderDL.GetRecipes(eventId, managerId);
        }

        public async Task<TblRecipesToOrder> GetRecipeToOrderAsync(int id)
        {
            return await recipesToOrderDL.GetRecipeToOrderAsync(id);
        }

        public async Task InsertRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            await recipesToOrderDL.InsertRecipeToOrderAsync(recipe);
        }

        public async Task UpdateRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            await recipesToOrderDL.UpdateRecipeToOrderAsync(recipe);
        }

        public async Task<List<ProductManagementDTO>> InventoryCalculation(int managerId, RangeDate rangeDate)
        {
            return await recipesToOrderDL.InventoryCalculation(managerId, rangeDate);
        }
    }
}
