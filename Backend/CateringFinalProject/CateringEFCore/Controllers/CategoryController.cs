using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entity.Models;
using BL;
using DAL;

namespace CateringEFCore.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoriesBL categoriesBL;

        public CategoryController(ICategoriesBL _categoriesBL)
        {
            this.categoriesBL = _categoriesBL;
        }

        [HttpGet("Categories")]
        public async Task<List<TblCategories>> GetAll()
        {
            return await categoriesBL.GetAllCategoriesAsync();
        }

        [HttpGet("CategoryById")]
        public async Task<TblCategories> GetCategoryById(int id)
        {
            return await categoriesBL.GetCategoryAsync(id);
        }

        [HttpPost("InsertCategory")]
        public async Task AddCategory(TblCategories category)
        {
            await categoriesBL.InsertCategoryAsync(category);
        }

        [HttpPut("UpdateCategory")]
        public async Task UpdateCategory(TblCategories category)
        {
            await categoriesBL.UpdateCategoryAsync(category);
        }

        [HttpDelete("DeleteCategory")]
        public async Task DeleteCategory(int id)
        {
            await categoriesBL.DeleteCategoryAsync(id);
        }
    }
}
