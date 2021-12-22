using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Converter
{
    public class ProductToRecipeConverter
    {
        public static ProductToRecipeDTO ConvertToProductToRecipe(TblProductsToRecipe p)
        {
            if (p != null)
            {
                return new ProductToRecipeDTO
                {
                    ProductToRecipeId = p.ProductToRecipeId,
                    ProductId = p.ProductId,
                    AmountToRecipe = p.AmountToRecipe,
                    RecipesId = p.RecipesId,
                    Product = ProductConverter.ConvertToProductDTO(p.Product)
                };
            }
            return null;
        }
    }
}
