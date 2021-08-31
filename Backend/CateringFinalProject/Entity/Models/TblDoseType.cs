using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblDoseType
    {
        public TblDoseType()
        {
            TblRecipes = new HashSet<TblRecipes>();
        }

        public int DoseTypeId { get; set; }
        public string DoseName { get; set; }

        public virtual ICollection<TblRecipes> TblRecipes { get; set; }
    }
}
