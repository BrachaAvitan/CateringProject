using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IProductDL
    {
        //Get All Product By managerId
        Task<List<ProductDTO>> GetProductsAsync(int managerId);

        //Get Product By Id & managerId
        Task<TblProducts> GetProductAsync(int id, int managerId);

        //Insert Product
        Task InsertProductAsync(TblProducts product);

        //Update Product
        Task UpdateProductAsync(TblProducts product);

        //Delete Product
        Task DeleteProductAsync(int id, int managerId);
    }
}
