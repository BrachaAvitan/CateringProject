using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblTools
    {
        public TblTools()
        {
            TblDetailsEvent = new HashSet<TblDetailsEvent>();
        }

        public int ToolId { get; set; }
        public string ToolName { get; set; }
        public int? OneTimeQuantity { get; set; }
        public int? AmountOfGlass { get; set; }

        public virtual ICollection<TblDetailsEvent> TblDetailsEvent { get; set; }
    }
}
