using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ProductToRecipeDTO
    {
        public int ProductToRecipeId { get; set; }
        public int ProductId { get; set; }
        public double AmountToRecipe { get; set; }
        public int RecipesId { get; set; }
        public ProductDTO Product { get; set; }
    }
}
