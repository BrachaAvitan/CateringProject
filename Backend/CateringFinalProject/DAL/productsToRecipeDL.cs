﻿using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ProductsToRecipeDL : IProductsToRecipeDL
    {
        private readonly CateringDBContext db;

        public ProductsToRecipeDL(CateringDBContext _db)
        {
            this.db = _db;
        }
        public async Task DeleteProductToRecipeAsync(int id, int managerId)
        {
            db.TblProductsToRecipe.Remove(db.TblProductsToRecipe.FirstOrDefault(p => p.ProductToRecipeId == id && p.Product.ManagerId == managerId));
            await db.SaveChangesAsync();
        }

        public async Task<List<TblProductsToRecipe>> GetProductsToRecipeAsync(int managerId)
        {
            return await db.TblProductsToRecipe.Where(p => p.Product.ManagerId == managerId).ToListAsync();
        }

        public async Task<TblProductsToRecipe> GetProductToRecipeAsync(int id, int managerId)
        {
            return await db.TblProductsToRecipe.FirstOrDefaultAsync(p => p.ProductToRecipeId == id && p.Product.ManagerId == managerId);
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
                pUpdate.ProductId = product.ProductId;
                pUpdate.AmountToRecipe = product.AmountToRecipe;
                pUpdate.RecipesId = product.RecipesId;
                await db.SaveChangesAsync();
            }
        }
    }
}
