using System;
using System.Collections.Generic;

namespace Entity.Models
{
    public partial class TblProducts
    {
        public TblProducts()
        {
            TblProductsToRecipe = new HashSet<TblProductsToRecipe>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public int? QuantityInStock { get; set; }
        public int TypeOfMeasurementId { get; set; }

        public virtual TblCategories Category { get; set; }
        public virtual TblTypesOfMeasurements TypeOfMeasurement { get; set; }
        public virtual ICollection<TblProductsToRecipe> TblProductsToRecipe { get; set; }
    }
}
