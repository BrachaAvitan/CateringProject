import api from '../api';

export class DetailsEventService {
    async getDetailsEvents(managerId: number){
        return await api.get(`/DetailsEvent/DetailsEvents?managerId=${managerId}`).then(res => res.data);
    } 

    async updateDetailsEvent(detailsEvent:any){
        await api.put('/DetailsEvent/UpdateDetailsEvent', detailsEvent).then(res => res.data);
    } 
}