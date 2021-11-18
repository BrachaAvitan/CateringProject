using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblRecipes
    {
        public TblRecipes()
        {
            TblProductsToRecipe = new HashSet<TblProductsToRecipe>();
            TblRecipesToOrder = new HashSet<TblRecipesToOrder>();
        }

        public int RecipesId { get; set; }
        public string Name { get; set; }
        public int? QuantityOfPortions { get; set; }
        public int MenuId { get; set; }
        public int? DoseTypeId { get; set; }
        public string Instructions { get; set; }
        public int ManagerId { get; set; }

        public virtual TblDoseType DoseType { get; set; }
        public virtual TblManager Manager { get; set; }
        public virtual TblMenuTypes Menu { get; set; }
        public virtual ICollection<TblProductsToRecipe> TblProductsToRecipe { get; set; }
        public virtual ICollection<TblRecipesToOrder> TblRecipesToOrder { get; set; }
    }
}
