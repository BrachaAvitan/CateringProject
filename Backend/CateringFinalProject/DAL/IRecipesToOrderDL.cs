using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IRecipesToOrderDL
    {
        //Get All RecipesToOrder
        Task<List<TblRecipesToOrder>> GetRecipesToOrderAsync();

        //Get RecipesOfOrder of one event By eventId & managerId
        Task<List<TblRecipesToOrder>> GetRecipesOfOneEventAsync(int eventId, int managerId);

        //Get RecipeToOrder By Id
        Task<TblRecipesToOrder> GetRecipeToOrderAsync(int id);

        //Insert RecipeToOrder
        Task InsertRecipeToOrderAsync(TblRecipesToOrder recipe);

        //Update RecipeToOrder
        Task UpdateRecipeToOrderAsync(TblRecipesToOrder recipe);

        //Delete RecipeToOrder
        Task DeleteRecipeToOrderAsync(int id);
    }
}
