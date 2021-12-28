import api from '../api';

export class RecipeService {
    async getRecipes(managerId: number) {
        return await api.get(`/Recipe/Recipes?managerId=${managerId}`).then(res => res.data);
    }
    async getRecipesByDoseTypeId(doseTypeId: number ,managerId: number) {
        return await api.get(`/Recipe/Recipes?doseTypeId=${doseTypeId}&managerId=${managerId}`).then(res => res.data);
    }
    async getRecipeById(id: number, managerId: number) {
        return await api.get(`/Recipe/RecipeById?id=${id}&manamgerId=${managerId}`).then(res => res.data);
    }
    async insertRecipe(recipe: any) {
        return await api.post('/Recipe/InsertRecipe', recipe).then(res => res.data);
    }
    async updateRecipe(recipe: any) {
        await api.put('/Recipe/UpdateRecipe', recipe).then(res => res.data);
    }
    //delete recipe
}