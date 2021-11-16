using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class productsToRecipeDL: IProductsToRecipeDL
    {
        private readonly CateringDBContext db;
        public productsToRecipeDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        public async Task DeleteProductToRecipeAsync(int id)
        {
            db.TblProductsToRecipe.Remove(db.TblProductsToRecipe.FirstOrDefault(p => p.ProductToRecipeId == id));
            await db.SaveChangesAsync();
        }

        public async Task<List<TblProductsToRecipe>> GetAllAsync()
        {
            return await db.TblProductsToRecipe.ToListAsync();
        }

        public async Task<TblProductsToRecipe> GetProductToRecipeAsync(int id)
        {
            return await db.TblProductsToRecipe.FirstOrDefaultAsync(p => p.ProductToRecipeId== id);
        }

        public async Task InsertProductToRecipeAsync(TblProductsToRecipe product)
        {
            db.TblProductsToRecipe.Add(product);
            await db.SaveChangesAsync();
        }

        public async Task UpdateProductToRecipeAsync(TblProductsToRecipe product)
        {
            TblProductsToRecipe pUpdate = db.TblProductsToRecipe.FirstOrDefault(p => p.ProductToRecipeId == product.ProductToRecipeId);
            if (pUpdate != null)
            {
                
                pUpdate.AmountToRecipe = product.AmountToRecipe;
                pUpdate.ProductId= product.ProductId;
                pUpdate.RecipesId= product.RecipesId;

                await db.SaveChangesAsync();
            }
        }
    }
}
