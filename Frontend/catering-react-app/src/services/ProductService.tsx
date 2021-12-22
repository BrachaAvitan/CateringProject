import api from '../api';

export class ProductService {

    async getProducts(managerId: number) {
        return await api.get(`/product/products?managerId=${managerId}`).then(res => res.data);
    }

    async getProduct(productId: number, managerId: number) {
        return await api.get(`/product/ProductById?id=${productId}&managerId=${managerId}`).then(res => res.data);
    }
}