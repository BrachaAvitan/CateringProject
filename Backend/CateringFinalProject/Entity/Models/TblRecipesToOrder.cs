using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblRecipesToOrder
    {
        public int RecipesToOrderId { get; set; }
        public int EventId { get; set; }
        public int RecipesId { get; set; }
        public int? Amount { get; set; }

        public virtual TblDetailsEvent Event { get; set; }
        public virtual TblRecipes Recipes { get; set; }
    }
}
