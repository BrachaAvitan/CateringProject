using System;
using System.Collections.Generic;

namespace Entity.Modules
{
    public partial class TblTypesOfMeasurements
    {
        public TblTypesOfMeasurements()
        {
            TblProducts = new HashSet<TblProducts>();
        }

        public int TypeOfMeasurementId { get; set; }
        public string TypeOfMeasurement { get; set; }

        public virtual ICollection<TblProducts> TblProducts { get; set; }
    }
}
