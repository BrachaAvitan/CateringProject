using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Converter
{
    public class CategoryConverter
    {
        public static CategoryDTO ConvertToCategoryDTO(TblCategories c)
        {
            return new CategoryDTO
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName
            };
        }
    }
}
