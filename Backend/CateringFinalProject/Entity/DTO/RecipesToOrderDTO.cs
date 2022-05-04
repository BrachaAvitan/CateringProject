using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class RecipesToOrderDTO
    {
        public int RecipesToOrderId { get; set; }
        public int EventId { get; set; }
        public int RecipesId { get; set; }
        public double? Amount { get; set; }
        public RecipeDTO Recipes { get; set; }
    }
}
