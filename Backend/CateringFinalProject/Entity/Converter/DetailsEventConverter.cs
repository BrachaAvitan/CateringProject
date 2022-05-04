using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Converter
{
    public class DetailsEventConverter
    {
        public static DetailsEventDTO ConvertToDetailsEventDTO(TblDetailsEvent d)
        {
            if (d != null)
            {
                return new DetailsEventDTO
                {
                    EventId = d.EventId,
                    Title = d.NameOfEventOwner,
                    PhoneNumberOfEventOwner = d.PhoneNumberOfEventOwner,
                    Details = d.Details,
                    Start = d.StartDate,
                    End = d.EndDate,
                    MenuId = d.MenuId,
                    NumberOfDose = d.NumberOfDose,
                    ToolsType = d.ToolsType,
                    IsCompleted = d.IsCompleted,
                    ManagerId = d.ManagerId,
                    Menu = new MenuTypeDTO { MenuId = d.Menu.MenuId, MenuName = d.Menu.MenuName }
                };
            }
            return null;
        }
    }
}
