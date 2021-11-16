using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public interface IRecipesToOrderDL
    {
        //Get All Recipes
        Task<List<TblRecipesToOrder>> GetAllAsync();

        //Get Recipe By Id
        Task<TblRecipesToOrder> GetRecipeToOrderAsync(int id);

        //Insert Recipe
        Task InsertRecipeToOrderAsync(TblRecipesToOrder recipe);

        //Update Recipe
        Task UpdateRecipeToOrderAsync(TblRecipesToOrder recipe);

        //Delete Recipe
        Task DeleteRecipeToOrderAsync(int id);
    }
}
