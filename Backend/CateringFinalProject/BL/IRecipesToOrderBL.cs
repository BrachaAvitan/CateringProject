using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IRecipesToOrderBL
    {
        //Get All RecipesToOrder
        Task<List<TblRecipesToOrder>> GetRecipesToOrderAsync();

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
