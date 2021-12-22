using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public int? QuantityInStock { get; set; }
        public int TypeOfMeasurementId { get; set; }
        public int ManagerId { get; set; }
        public TypeOfMeasurementDTO TypeOfMeasurement{ get; set; }
    }
}
