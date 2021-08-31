using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblMenuTypes
    {
        public TblMenuTypes()
        {
            TblRecipes = new HashSet<TblRecipes>();
        }

        public int MenuId { get; set; }
        public string MenuName { get; set; }

        public virtual ICollection<TblRecipes> TblRecipes { get; set; }
    }
}
