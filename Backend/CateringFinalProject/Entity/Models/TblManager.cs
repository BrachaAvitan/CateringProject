﻿using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblManager
    {
        public TblManager()
        {
            TblDetailsEvent = new HashSet<TblDetailsEvent>();
            TblProducts = new HashSet<TblProducts>();
            TblRecipes = new HashSet<TblRecipes>();
            TblTools = new HashSet<TblTools>();
        }

        public int ManagerId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<TblDetailsEvent> TblDetailsEvent { get; set; }
        public virtual ICollection<TblProducts> TblProducts { get; set; }
        public virtual ICollection<TblRecipes> TblRecipes { get; set; }
        public virtual ICollection<TblTools> TblTools { get; set; }
    }
}
