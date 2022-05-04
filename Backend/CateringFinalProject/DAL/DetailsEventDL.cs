using CateringEFCore.Classes;
using Entity.Converter;
using Entity.DTO;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DetailsEventDL: IDetailsEventDL
    {
        private readonly CateringDBContext db;

        public DetailsEventDL(CateringDBContext _db)
        {
            this.db = _db;
        }

        public async Task DeleteDetailsEventAsync(int id, int managerId)
        {
            db.TblDetailsEvent.Remove(db.TblDetailsEvent.FirstOrDefault(d => d.EventId == id && d.ManagerId == managerId));
            await db.SaveChangesAsync();
        }

        public async Task<List<DetailsEventDTO>> GetDetailsEventsAsync(int managerId)
        {
            return await db.TblDetailsEvent.Where(d => d.ManagerId == managerId).Include(d => d.Menu).Select(d => DetailsEventConverter.ConvertToDetailsEventDTO(d)).ToListAsync();
            
        }

        public async Task<List<int>> GetDetailsEventsinRangeAsync(int managerId, RangeDate rangeDate)
        {
            return await db.TblDetailsEvent.Where(d => d.ManagerId == managerId && d.StartDate.Date >= rangeDate.dateMin && d.EndDate.Date <= rangeDate.dateMax).Select(d => d.EventId).ToListAsync();
        }

        public async Task<TblDetailsEvent> GetDetailsEventAsync(int id, int managerId)
        {
            return await db.TblDetailsEvent.FirstOrDefaultAsync(d => d.EventId == id && d.ManagerId == managerId);
        }

        public async Task InsertDetailsEventAsync(TblDetailsEvent detailsEvent)
        {
            await db.TblDetailsEvent.AddAsync(detailsEvent);
            await db.SaveChangesAsync();
        }

        public async Task UpdateDetailsEventAsync(TblDetailsEvent detailsEvent)
        {
            TblDetailsEvent dUpdate = db.TblDetailsEvent.FirstOrDefault(d => d.EventId == detailsEvent.EventId && d.ManagerId == detailsEvent.ManagerId);
            if (dUpdate != null)
            {
                dUpdate.EventId = detailsEvent.EventId;
                dUpdate.NameOfEventOwner = detailsEvent.NameOfEventOwner;
                dUpdate.PhoneNumberOfEventOwner = detailsEvent.PhoneNumberOfEventOwner;
                dUpdate.Details = detailsEvent.Details;
                dUpdate.StartDate = detailsEvent.StartDate;
                dUpdate.EndDate = detailsEvent.EndDate;
                dUpdate.MenuId = detailsEvent.MenuId;
                dUpdate.NumberOfDose = detailsEvent.NumberOfDose;
                dUpdate.IsCompleted = detailsEvent.IsCompleted;
                dUpdate.ManagerId = detailsEvent.ManagerId;
                await db.SaveChangesAsync();
            }
        }
    }
}
