using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblMenuTypes
    {
        public TblMenuTypes()
        {
            TblDetailsEvent = new HashSet<TblDetailsEvent>();
            TblRecipes = new HashSet<TblRecipes>();
        }

        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public int ManagerId { get; set; }

        public virtual TblManager Manager { get; set; }
        public virtual ICollection<TblDetailsEvent> TblDetailsEvent { get; set; }
        public virtual ICollection<TblRecipes> TblRecipes { get; set; }
    }
}
