using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Converter
{
    public class RecipesToOrderConverter
    {
        public static RecipesToOrderDTO ConvertToRecipeDTO(TblRecipesToOrder r)
        {
            return new RecipesToOrderDTO
            {
                RecipesToOrderId = r.RecipesToOrderId,
                EventId = r.EventId,
                RecipesId = r.RecipesId,
                Amount = r.Amount,
                Recipes = RecipeConvertter.convertToRecipeDTO(r.Recipes),
            };
        }
    }
}
