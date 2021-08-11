using System;
using System.Collections.Generic;

namespace Entity.Modules
{
    public partial class TblProducts
    {
        public TblProducts()
        {
            TblProductsToRecipe = new HashSet<TblProductsToRecipe>();
        }

        public int ProductsId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public int? QuantityInStock { get; set; }
        public int TypeOfMeasurementId { get; set; }

        public virtual TblCategories Ctaegory { get; set; }
        public virtual TblTypesOfMeasurements TypeOfMeasurement { get; set; }
        public virtual ICollection<TblProductsToRecipe> TblProductsToRecipe { get; set; }
    }
}
