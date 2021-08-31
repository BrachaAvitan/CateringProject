using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CateringEFCore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductBL productBL;

        public ProductController(IProductBL _productBL)
        {
            this.productBL = _productBL;
        }

        [HttpGet("Products")]
        public async Task<List<TblProducts>> GetAll()
        {
            return await productBL.GetAllAsync();
        }

        [HttpGet("ProductById")]
        public async Task<TblProducts> GetProductById(int id)
        {
            return await productBL.GetProductAsync(id);
        }

        [HttpPost("InsertProduct")]
        public async Task InsertProduct(TblProducts product)
        {
            await productBL.InsertProductAsync(product);
        }

        [HttpPut("UpdateProduct")]
        public async Task UpdateProduct(TblProducts product)
        {
            await productBL.UpdateProductAsync(product);
        }

        [HttpDelete("DeleteProduct")]
        public async Task DeleteProduct(int id)
        {
            await productBL.DeleteProductAsync(id);
        }
    }
}
