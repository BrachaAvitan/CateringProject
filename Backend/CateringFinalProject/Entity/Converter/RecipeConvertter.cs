using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Converter
{
    public class RecipeConvertter
    {
        public static RecipeDTO convertToRecipeDTO(TblRecipes r)
        {
            return new RecipeDTO
            {
                RecipesId = r.RecipesId,
                Name = r.Name,
                QuantityOfPortions = r.QuantityOfPortions,
                MenuId = r.MenuId,
                DoseTypeId = r.DoseTypeId,
                Instructions = r.Instructions,
                ManagerId = r.ManagerId,
                Menu = new MenuTypeDTO { MenuId = r.Menu.MenuId, MenuName = r.Menu.MenuName}
            };
        }

        public static List<RecipeDTO> convertToListMenuTypeDTO(List<TblRecipes> list)
        {
            return list.Select(r => convertToRecipeDTO(r)).ToList();
        }
    }
}
