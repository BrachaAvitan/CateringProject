import api from '../api';

export class ProductService {

    async getProducts(managerId: number) {
        return await api.get(`/product/products?managerId=${managerId}`).then(res => res.data);
    }
}