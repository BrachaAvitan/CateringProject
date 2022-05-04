using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblManager
    {
        public TblManager()
        {
            TblDetailsEvent = new HashSet<TblDetailsEvent>();
            TblMenuTypes = new HashSet<TblMenuTypes>();
            TblProducts = new HashSet<TblProducts>();
            TblRecipes = new HashSet<TblRecipes>();
            TblTools = new HashSet<TblTools>();
        }

        public int ManagerId { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Active { get; set; }
        public bool Blocked { get; set; }

        public virtual ICollection<TblDetailsEvent> TblDetailsEvent { get; set; }
        public virtual ICollection<TblMenuTypes> TblMenuTypes { get; set; }
        public virtual ICollection<TblProducts> TblProducts { get; set; }
        public virtual ICollection<TblRecipes> TblRecipes { get; set; }
        public virtual ICollection<TblTools> TblTools { get; set; }
    }
}
