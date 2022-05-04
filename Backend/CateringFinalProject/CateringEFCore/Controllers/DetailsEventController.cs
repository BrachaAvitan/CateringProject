using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using CateringEFCore.Classes;
using Entity.DTO;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CateringEFCore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DetailsEventController : ControllerBase
    {
        public readonly IDetailsEventBL detailsEventBL;

        public DetailsEventController(IDetailsEventBL _detailsEventBL)
        {
            this.detailsEventBL = _detailsEventBL;
        }

        [HttpGet("DetailsEvents")]
        public async Task<List<DetailsEventDTO>> GetAll(int managerId)
        {
            return await detailsEventBL.GetDetailsEventsAsync(managerId);
        }
        
        [HttpGet("DetailsEventsInRenge")]
        public async Task<List<int>> GetDetailsEventsInRange(int managerId, RangeDate rangeDate)
        {
            return await detailsEventBL.GetDetailsEventsinRangeAsync(managerId, rangeDate);
        }

        [HttpGet("DetailsEvent")]
        public async Task<TblDetailsEvent> GetDetailsEventById(int id, int managerId)
        {
            return await detailsEventBL.GetDetailsEventAsync(id, managerId);
        }

        [HttpPost("InsertDetailsEvent")]
        public async Task InsertDetailsEvent(TblDetailsEvent detailsEvent)
        {
            await detailsEventBL.InsertDetailsEventAsync(detailsEvent);
        }

        [HttpPut("UpdateDetailsEvent")]
        public async Task UpdateDetailsEvent(TblDetailsEvent detailsEvent)
        {
            await detailsEventBL.UpdateDetailsEventAsync(detailsEvent);
        }

        [HttpDelete("DeleteDetailsEvent")]
        public async Task DeleteDetailsEvent(int id, int managerId)
        {
            await detailsEventBL.DeleteDetailsEventAsync(id, managerId);
        }
    }
}
