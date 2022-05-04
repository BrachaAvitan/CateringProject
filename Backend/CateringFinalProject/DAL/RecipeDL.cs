using Entity.Converter;
using Entity.DTO;
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

        public async Task DeleteRecipeAsync(int id, int managerId)
        {
            db.TblRecipes.Remove(db.TblRecipes.FirstOrDefault(r => r.RecipesId == id && r.ManagerId == managerId));
            await db.SaveChangesAsync();
        }

        public async Task<List<RecipeDTO>> GetRecipesAsync(int managerId)
        {
            return await db.TblRecipes.Where(r => r.ManagerId == managerId).Include(r => r.Menu).Include(r => r.DoseType).Select(r => RecipeConvertter.convertToRecipeDTO(r)).ToListAsync();
            //return await db.TblRecipes.Where(r => r.ManagerId == managerId).Include(r => r.TblRecipesToOrder).ThenInclude(m => m.Event).ToListAsync();
        }
        //קבלת מתכונים לפי מזהה סוג מנה ומזהה בעל קיטרינג
        public async Task<List<RecipeDTO>> GetRecipesByDoseId(int doseTypeId, int managerId)
        {
            return await db.TblRecipes.Where(r => r.DoseTypeId == doseTypeId && r.ManagerId == managerId).Include(r => r.Menu).Include(r => r.DoseType).Select(r => RecipeConvertter.convertToRecipeDTO(r)).ToListAsync();
        }

        public async Task<TblRecipes> GetRecipeAsync(int id, int managerId)
        {
            return await db.TblRecipes.FirstOrDefaultAsync(r => r.RecipesId == id && r.ManagerId == managerId);
        }

        public async Task<int> InsertRecipeAsync(TblRecipes recipe)
        {
            //לתקן את זה
            await db.TblRecipes.AddAsync(recipe);
            await db.SaveChangesAsync();
            List<RecipeDTO> recipes = await GetRecipesAsync(recipe.ManagerId);
            RecipeDTO[] r = recipes.ToArray();
            return r[r.Length-1].RecipesId;
        }

        public async Task UpdateRecipeAsync(TblRecipes recipe)
        {
            TblRecipes rUpdate = db.TblRecipes.FirstOrDefault(r => r.RecipesId == recipe.RecipesId && r.ManagerId == recipe.ManagerId);
            if (rUpdate != null)
            {
                rUpdate.Name = recipe.Name;
                rUpdate.QuantityOfPortions = recipe.QuantityOfPortions;
                rUpdate.MenuId = recipe.MenuId;
                rUpdate.DoseTypeId = recipe.DoseTypeId;
                rUpdate.Instructions = recipe.Instructions;
                rUpdate.ManagerId = recipe.ManagerId;
                await db.SaveChangesAsync();
            }
        }
    }
}
