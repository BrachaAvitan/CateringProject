using DAL;
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

        public async Task<List<TblRecipesToOrder>> GetRecipesToOrderAsync()
        {
            return await recipesToOrderDL.GetRecipesToOrderAsync();
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
    }
}
