using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ProductManagementDTO
    {
        public string NameProduct { get; set; }
        public double QuantityPerEvent { get; set; }
        public double QuantityInStock { get; set; }
        public string TypeOfMeasurement { get; set; }
    }
}
