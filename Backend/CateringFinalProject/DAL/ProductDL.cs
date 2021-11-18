using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ProductDL : IProductDL
    {
        private readonly CateringDBContext db;

        public ProductDL(CateringDBContext _db)
        {
            this.db = _db;
        }

        public async Task DeleteProductAsync(int id, int managerId)
        {
            db.TblProducts.Remove(db.TblProducts.FirstOrDefault(p => p.ProductId == id && p.ManagerId == managerId));
            await db.SaveChangesAsync();
        }

        public async Task<List<TblProducts>> GetProductsAsync(int managerId)
        {
            return await db.TblProducts.Where(p => p.ManagerId == managerId).ToListAsync();
        }

        public async Task<TblProducts> GetProductAsync(int id, int managerId)
        {
            return await db.TblProducts.FirstOrDefaultAsync(p => p.ProductId == id & p.ManagerId == managerId);
        }

        public async Task InsertProductAsync(TblProducts product)
        {
            db.TblProducts.Add(product);
            await db.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(TblProducts product)
        {
            TblProducts pUpdate = db.TblProducts.FirstOrDefault(p => p.ProductId == product.ProductId);
            if (pUpdate != null)
            {
                pUpdate.ProductName = product.ProductName;
                pUpdate.CategoryId = product.CategoryId;
                pUpdate.QuantityInStock = product.QuantityInStock;
                pUpdate.TypeOfMeasurementId = product.TypeOfMeasurementId;
                await db.SaveChangesAsync();
            }
        }
    }
}
