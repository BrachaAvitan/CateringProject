using DAL;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductBL : IProductBL
    {
        private readonly IProductDL productDL;

        public ProductBL(IProductDL _productDL)
        {
            this.productDL = _productDL;
        }

        public async Task DeleteProductAsync(int id)
        {
            await productDL.DeleteProductAsync(id);
        }

        public async Task<List<TblProducts>> GetAllAsync()
        {
            return await productDL.GetAllAsync();
        }

        public async Task<TblProducts> GetProductAsync(int id)
        {
            return await productDL.GetProductAsync(id);
        }

        public async Task InsertProductAsync(TblProducts product)
        {
            await productDL.InsertProductAsync(product);
        }

        public async Task UpdateProductAsync(TblProducts product)
        {
            await productDL.UpdateProductAsync(product);
        }
    }
}
