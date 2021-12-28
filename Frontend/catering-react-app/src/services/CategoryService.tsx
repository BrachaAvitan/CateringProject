import api from '../api';

export class CategoryService{
    async getCateories(){
        return api.get('/Category/Categories').then((res: any) => res.data);
    }
}