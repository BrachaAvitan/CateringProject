using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RecipeDL : IRecipeDL
    {
        private readonly CateringDBContext db;

        public RecipeDL(CateringDBContext _db)
        {
            this.db = _db;
        }

        public async Task DeleteRecipeAsync(int id)
        {
            db.TblRecipes.Remove(db.TblRecipes.FirstOrDefault(r => r.RecipesId == id));
            await db.SaveChangesAsync();
        }

        public async Task<List<TblRecipes>> GetAllAsync()
        {
            return await db.TblRecipes.ToListAsync();
        }

        public async Task<TblRecipes> GetRecipeAsync(int id)
        {
            return await db.TblRecipes.FirstOrDefaultAsync(r => r.RecipesId == id);
        }

        public async Task InsertRecipeAsync(TblRecipes recipe)
        {
            await db.TblRecipes.AddAsync(recipe);
            await db.SaveChangesAsync();
        }

        public async Task UpdateRecipeAsync(TblRecipes recipe)
        {
            TblRecipes rUpdate = db.TblRecipes.FirstOrDefault(r => r.RecipesId == recipe.RecipesId);
            if (rUpdate != null)
            {
                rUpdate.Name = recipe.Name;
                rUpdate.QuantityOfPortions = recipe.QuantityOfPortions;
                rUpdate.MenuId = recipe.MenuId;
                rUpdate.DoseTypeId = recipe.DoseTypeId;
                await db.SaveChangesAsync();
            }
        }
    }
}
