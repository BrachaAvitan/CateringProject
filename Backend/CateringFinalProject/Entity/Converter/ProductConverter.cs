using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Converter
{
    public class ProductConverter
    {
        public static ProductDTO ConvertToProductDTO(TblProducts p)
        {
            return new ProductDTO
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                CategoryId = p.CategoryId,
                QuantityInStock = p.QuantityInStock,
                TypeOfMeasurementId = p.TypeOfMeasurementId,
                ManagerId = p.ManagerId,
                TypeOfMeasurement = TypeOfMeasurementConverter.convertToTypeOfMeasurementDTO(p.TypeOfMeasurement)
            };
        }

        public static List<ProductDTO> ConvertToListProductDTO(List<TblProducts> list)
        {
            return list.Select(p => ConvertToProductDTO(p)).ToList();
        }
    }
}
