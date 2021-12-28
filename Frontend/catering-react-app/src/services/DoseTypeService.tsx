import api from '../api';

export class DoseTypeService {
    async getDoseTypes(){
        return await api.get('/DoseType/DoseTypes').then(res => res.data);
    }
}