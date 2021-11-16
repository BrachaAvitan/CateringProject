import api from '../api';


export class MenuTypeService {
    async getMenuTypes() {
        return await api.get('/MenuType/MenuTypes').then(res => res.data);
    }

    async getMenuTypeById(id:number) {
        return await api.get(`/MenuType/MenuTypeById?id=${id}`).then(res => res.data);
    }

    async getMenuNames() {
        return await api.get('/MenuType/MenuNames').then(res => res.data);
    }
}