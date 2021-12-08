using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Converter
{
    public class TypeOfMeasurementConverter
    {
        public static TypeOfMeasurementDTO convertToTypeOfMeasurementDTO(TblTypesOfMeasurements m)
        {
            return new TypeOfMeasurementDTO
            {
                TypeOfMeasurementId = m.TypeOfMeasurementId,
                TypeOfMeasurement = m.TypeOfMeasurement
            };
        }

        public static List<TypeOfMeasurementDTO> convertToListTypeMeasurementDTO(List<TblTypesOfMeasurements> list)
        {
            return list.Select(m => convertToTypeOfMeasurementDTO(m)).ToList();
        }
    }
}
