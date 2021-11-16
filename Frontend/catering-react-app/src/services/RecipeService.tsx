import api from '../api';

export class RecipeService {
    async getRecipes() {
        return await api.get('/Recipe/Recipes').then(res => res.data);
    }
    async getRecipeById(id: any) {
        return await api.get(`/Recipe/RecipeById?id=${id}`).then(res => res.data);
    }
    async insertRecipe(recipe: any) {
        await api.post('/Recipe/InsertRecipe', recipe).then(res => res.data);
    }
    async updateRecipe(recipe: any) {
        await api.put('/Recipe/UpdateRecipe', recipe).then(res => res.data);
    }
}