using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Converter
{
    public class DoseTypeConverter
    {
        public static DoseTypeDTO ConvertToDoseType(TblDoseType d)
        {
            if (d != null)
            {
                return new DoseTypeDTO
                {
                    DoseTypeId = d.DoseTypeId,
                    DoseName = d.DoseName
                };
            }
            return null;
        }

        public static List<DoseTypeDTO> ConvertToListDoseType(List<TblDoseType> list)
        {
            return list.Select(d => ConvertToDoseType(d)).ToList();
        }
    }
}
