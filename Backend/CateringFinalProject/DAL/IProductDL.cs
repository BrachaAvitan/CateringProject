using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IProductDL
    {
        //Get All Product
        Task<List<TblProducts>> GetAllAsync();

        //Get Product By Id
        Task<TblProducts> GetProductAsync(int id);

        //Insert Product
        Task InsertProductAsync(TblProducts product);

        //Update Product
        Task UpdateProductAsync(TblProducts product);

        //Delete Product
        Task DeleteProductAsync(int id);
    }
}
