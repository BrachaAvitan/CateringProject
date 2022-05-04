using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class RecipeDTO
    {
        public int RecipesId { get; set; }
        public string Name { get; set; }
        public int? QuantityOfPortions { get; set; }
        public int MenuId { get; set; }
        public int? DoseTypeId { get; set; }
        public string Instructions { get; set; }
        public int ManagerId { get; set; }
        public MenuTypeDTO Menu { get; set; }
        public DoseTypeDTO DoseType { get; set; }
    }
}
