import api from '../api';

export class ProductService {

    async getProducts(managerId: number) {
        return await api.get(`/product/products?managerId=${managerId}`).then(res => res.data);
    }

    async getProduct(productId: number, managerId: number) {
        return await api.get(`/product/ProductById?id=${productId}&managerId=${managerId}`).then(res => res.data);
    }

    async updateProduct(managerId: number, product:any) {
        return await api.put(`/product/UpdateProduct?managerId=${managerId}`,product).then(res=> res.data);
    }
}