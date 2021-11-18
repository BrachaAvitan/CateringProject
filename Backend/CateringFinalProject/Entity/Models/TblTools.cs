using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblTools
    {
        public int ToolId { get; set; }
        public string ToolName { get; set; }
        public int? OneTimeQuantity { get; set; }
        public int? AmountOfGlass { get; set; }
        public int ManagerId { get; set; }

        public virtual TblManager Manager { get; set; }
    }
}
