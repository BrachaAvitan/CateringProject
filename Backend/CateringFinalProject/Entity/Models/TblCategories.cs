using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblCategories
    {
        public TblCategories()
        {
            TblProducts = new HashSet<TblProducts>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string PreOrderTime { get; set; }

        public virtual ICollection<TblProducts> TblProducts { get; set; }
    }
}
