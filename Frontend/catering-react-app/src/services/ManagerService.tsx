import api from '../api';

export class ManagerService {
    async getManager(userName: string, password: string) {
        return api.get(`/Manager/Login?name=${userName}&password=${password}`).then(res => res.data);
    }

    async getIsUserNameExist(userName: string) {
        return api.get(`/Manager/IsUserNameExist?userName=${userName}`).then(res => res.data);
    }
}