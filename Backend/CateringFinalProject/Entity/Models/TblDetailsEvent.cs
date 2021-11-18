using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblDetailsEvent
    {
        public TblDetailsEvent()
        {
            TblRecipesToOrder = new HashSet<TblRecipesToOrder>();
        }

        public int EventId { get; set; }
        public string NameOfEventOwner { get; set; }
        public string Details { get; set; }
        public DateTime? Date { get; set; }
        public string ToolsType { get; set; }
        public int? NumberOfDose { get; set; }
        public int ManagerId { get; set; }

        public virtual TblManager Manager { get; set; }
        public virtual ICollection<TblRecipesToOrder> TblRecipesToOrder { get; set; }
    }
}
