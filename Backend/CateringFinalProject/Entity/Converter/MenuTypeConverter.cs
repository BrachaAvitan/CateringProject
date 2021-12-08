using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Converter
{
    public class MenuTypeConverter
    {
        public static MenuTypeDTO convertToMenuTypeDTO(TblMenuTypes m)
        {
            return new MenuTypeDTO
            {
                MenuId = m.MenuId,
                MenuName = m.MenuName
            };
        }

        public static List<MenuTypeDTO> convertToListMenuTypeDTO(List<TblMenuTypes> list)
        {
            return list.Select(m => convertToMenuTypeDTO(m)).ToList();
        }
    }
}
