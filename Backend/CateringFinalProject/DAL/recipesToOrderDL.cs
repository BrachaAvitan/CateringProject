﻿using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RecipesToOrderDL : IRecipesToOrderDL
    {
        private readonly CateringDBContext db;

        public RecipesToOrderDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        public async Task DeleteRecipeToOrderAsync(int id)
        {
            db.TblRecipesToOrder.Remove(db.TblRecipesToOrder.FirstOrDefault(r => r.RecipesToOrderId == id));
            await db.SaveChangesAsync();
        }
        public async Task<List<TblRecipesToOrder>> GetRecipesToOrderAsync()
        {
            return await db.TblRecipesToOrder.ToListAsync();
        }

        public async Task<List<TblRecipesToOrder>> GetRecipesOfOneEventAsync(int eventId, int managerId)
        {
            return await db.TblRecipesToOrder.Where(r => r.EventId == eventId && r.Recipes.ManagerId == managerId).ToListAsync();
        }

        public async Task<TblRecipesToOrder> GetRecipeToOrderAsync(int id)
        {
            return await db.TblRecipesToOrder.FirstOrDefaultAsync(r => r.RecipesToOrderId == id);
        }

        public async Task InsertRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            await db.TblRecipesToOrder.AddAsync(recipe);
            await db.SaveChangesAsync();
        }

        public async Task UpdateRecipeToOrderAsync(TblRecipesToOrder recipe)
        {
            TblRecipesToOrder rUpdate = db.TblRecipesToOrder.FirstOrDefault(r => r.RecipesToOrderId == recipe.RecipesToOrderId);
            if (rUpdate != null)
            {
                rUpdate.EventId = recipe.EventId;
                rUpdate.RecipesId = recipe.RecipesId;
                rUpdate.Amount = recipe.Amount;
                await db.SaveChangesAsync();
            }

        }
    }

}