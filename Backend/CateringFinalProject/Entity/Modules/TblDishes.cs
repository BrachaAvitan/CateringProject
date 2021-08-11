using System;
using System.Collections.Generic;

namespace Entity.Modules
{
    public partial class TblDishes
    {
        public TblDishes()
        {
            TblDetailsEvent = new HashSet<TblDetailsEvent>();
        }

        public int DishesId { get; set; }
        public string DishesName { get; set; }
        public int? OneTimeQuantity { get; set; }
        public int? AmountOfGlass { get; set; }

        public virtual ICollection<TblDetailsEvent> TblDetailsEvent { get; set; }
    }
}
