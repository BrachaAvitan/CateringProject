import api from '../api';

export class ProductsToRecipeService {

    async getProductsToRecipe(recipeId: number, managerId: number) {
        return await api.get(`/ProductToRecipe/ProductsToRecipe?recipeId=${recipeId}&managerId=${managerId}`).then(res => res.data);
    }
}