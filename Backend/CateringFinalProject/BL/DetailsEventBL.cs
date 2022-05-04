using CateringEFCore.Classes;
using DAL;
using Entity.DTO;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class DetailsEventBL : IDetailsEventBL
    {
        private readonly IDetailsEventDL detailsEventDL;

        public DetailsEventBL(IDetailsEventDL _detailsEventDL)
        {
            this.detailsEventDL = _detailsEventDL;
        }

        public async Task DeleteDetailsEventAsync(int id, int managerId)
        {
            await detailsEventDL.DeleteDetailsEventAsync(id,managerId);
        }

        public async Task<List<DetailsEventDTO>> GetDetailsEventsAsync(int managerId)
        {
            return await detailsEventDL.GetDetailsEventsAsync(managerId);
        }

        public async Task<List<int>> GetDetailsEventsinRangeAsync(int managerId, RangeDate rangeDate)
        {
            return await detailsEventDL.GetDetailsEventsinRangeAsync(managerId, rangeDate);
        }

        public async Task<TblDetailsEvent> GetDetailsEventAsync(int id, int managerId)
        {
            return await detailsEventDL.GetDetailsEventAsync(id, managerId);
        }

        public async Task InsertDetailsEventAsync(TblDetailsEvent d)
        {
            await detailsEventDL.InsertDetailsEventAsync(d);
        }

        public async Task UpdateDetailsEventAsync(TblDetailsEvent d)
        {
            await detailsEventDL.UpdateDetailsEventAsync(d);
        }
}
}
