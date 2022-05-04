using CateringEFCore.Classes;
using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IDetailsEventDL
    {
        //Get All DetailsEvents By managerId
        Task<List<DetailsEventDTO>> GetDetailsEventsAsync(int managerId);

        //Get Events in range: dateMin to dateMax
        Task<List<int>> GetDetailsEventsinRangeAsync(int managerId, RangeDate rangeDate);

        //Get DetailsEvent By Id & managerId
        Task<TblDetailsEvent> GetDetailsEventAsync(int id, int managerId);

        //Insert DetailsEvent
        Task InsertDetailsEventAsync(TblDetailsEvent detailsEvent);

        //Update DetailsEvent
        Task UpdateDetailsEventAsync(TblDetailsEvent detailsEvent);

        //Delete DetailsEvent
        Task DeleteDetailsEventAsync(int id, int managerId);
    }
}
