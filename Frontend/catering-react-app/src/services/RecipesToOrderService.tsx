import api from '../api';

export class RecipesToOrderService {
    async getProduceDocument(eventId: number, managerId: number) {
        return await api.get(`/RecipeToOrder/ProduceDocument?id=${eventId}&managerId=${managerId}`).then((res: any) => res.data);
    }
}