import produce from 'immer';
import { Cookie } from '../../Cookies';
const cookie = new Cookie();

const initialState = {
    connectedUser: {
        managerId: cookie.getCookie("userId")? cookie.getCookie("userId"): 0,
        name: cookie.getCookie("userName")? cookie.getCookie("userName"): "",
        password: cookie.getCookie("userPassword")? cookie.getCookie("userPassword"): ""
    }
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'USER_CONNECTION':
            console.log(action.payload);
            return { ...state, connectedUser: action.payload };
        case 'USER_NO_CONNECTION':
            return { ...state, connectedUser: null };
        default:
            return state;
    }
}, initialState);

export default reducer;