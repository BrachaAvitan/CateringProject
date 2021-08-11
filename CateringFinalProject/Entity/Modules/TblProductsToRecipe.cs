using System;
using System.Collections.Generic;

namespace Entity.Modules
{
    public partial class TblProductsToRecipe
    {
        public int ProductToRecipeId { get; set; }
        public int ProductsId { get; set; }
        public double? AmountToRecipe { get; set; }
        public int? RecipesId { get; set; }

        public virtual TblProducts Products { get; set; }
        public virtual TblRecipes Recipes { get; set; }
    }
}
