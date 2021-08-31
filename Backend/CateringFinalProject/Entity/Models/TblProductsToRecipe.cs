using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblProductsToRecipe
    {
        public int ProductToRecipeId { get; set; }
        public int ProductId { get; set; }
        public double? AmountToRecipe { get; set; }
        public int? RecipesId { get; set; }

        public virtual TblProducts Product { get; set; }
        public virtual TblRecipes Recipes { get; set; }
    }
}
