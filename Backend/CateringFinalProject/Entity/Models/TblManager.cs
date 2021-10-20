using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblManager
    {
        public int ManagerId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
