import api from '../api';

export class RecipesToOrderService {
    async getProduceDocument(managerId: number, rangeDate: any) {
        return await api.post(`/RecipeToOrder/ProduceDocument?managerId=${managerId}`, rangeDate).then((res: any) => res.data);
    }

    async getRecipesToOrder(eventId: number, managerId: number) {
        return await api.get(`/RecipeToOrder/RecipesToOrder?id=${eventId}&managerId=${managerId}`).then((res: any) => res.data);
    }

    async getRecipes(eventId: number, managerId: number) {
        return await api.get(`/RecipeToOrder/Recipes?eventId=${eventId}&managerId=${managerId}`).then((res: any) => res.data);
    }
}