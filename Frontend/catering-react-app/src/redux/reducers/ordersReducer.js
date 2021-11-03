import produce from 'immer';

const initialState = {
    orders: [] = null,
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.paylod };
        default:
            return state;
    }
}, initialState);

export default reducer;