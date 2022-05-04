using CateringEFCore.Classes;
using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IRecipesToOrderDL
    {
        //Get All RecipesToOrder By eventId & managerId
        Task<List<RecipesToOrderDTO>> GetRecipesToOrderAsync(int eventId, int managerId);

        //Get RecipesOfOrder of one event By eventId & managerId
        Task<List<TblRecipesToOrder>> GetRecipesOfOneEventAsync(int eventId, int managerId);

        //Get Recipes from RecipesToOrder
        Task<List<RecipeDTO>> GetRecipes(int eventId, int managerId);

        //Get RecipeToOrder By Id
        Task<TblRecipesToOrder> GetRecipeToOrderAsync(int id);

        //Insert RecipeToOrder
        Task InsertRecipeToOrderAsync(TblRecipesToOrder recipe);

        //Update RecipeToOrder
        Task UpdateRecipeToOrderAsync(TblRecipesToOrder recipe);

        //Delete RecipeToOrder
        Task DeleteRecipeToOrderAsync(int id);

        //Inventory Calculation
        Task<List<ProductManagementDTO>> InventoryCalculation(int managerId, RangeDate rangeDate);
    }
}
