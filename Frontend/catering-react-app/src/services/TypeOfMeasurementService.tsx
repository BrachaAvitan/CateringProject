import api from '../api';

export class TypeOfMeasurementService {

    async getTypeOfMeasurements() {
        return await api.get('/TypeOfMeasurement/TypeOfMeasurements').then((res: any) => res.data);
    }

}