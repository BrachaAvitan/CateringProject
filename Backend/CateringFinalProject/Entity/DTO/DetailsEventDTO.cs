using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class DetailsEventDTO
    {
        public int EventId { get; set; }
        public string Title { get; set; }
        public string PhoneNumberOfEventOwner { get; set; }
        public string Details { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int MenuId { get; set; }
        public int NumberOfDose { get; set; }
        public string ToolsType { get; set; }
        public bool IsCompleted { get; set; }
        public int ManagerId { get; set; }
        public virtual MenuTypeDTO Menu { get; set; }
    }
}
