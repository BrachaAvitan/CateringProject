import api from '../api';

export class ProductsToRecipeService {

    async getProductsToRecipe(recipeId: number, managerId: number) {
        return await api.get(`/ProductToRecipe/ProductsToRecipe?recipeId=${recipeId}&managerId=${managerId}`).then(res => res.data);
    }

    async insertProductToRecipe(productToRecipe: any) {
        await api.post('/ProductToRecipe/InsertProductToRecipe', productToRecipe).then(res => res.data);
    }

    async updateProductToRecipe(productToRecipe: any) {
        await api.put('/ProductToRecipe/UpdateProductToRecipe', productToRecipe).then(res => res.data);
    }

    async deleteProductToRecipe(productToRecipeId: number, managerId: number) {
        await api.delete(`/ProductToRecipe/DeleteProductToRecipe?id=${productToRecipeId}&managerId=${managerId}`).then(res => res.data);
    }
}