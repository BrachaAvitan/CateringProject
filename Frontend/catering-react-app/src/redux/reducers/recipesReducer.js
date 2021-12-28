import produce from 'immer';

const initialState = {
    recipes: [],
    products: [],
    menuTypes: [],
    doseTypes: [],
    categories: []
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_RECIPES':
            return { ...state, recipes: action.payload }
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload }
        case 'SET_MENU_TYPES':
            return { ...state, menuTypes: action.payload }
        case 'SET_DOSE_TYPES':
            return { ...state, doseTypes: action.payload }
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload }
        // case 'SET_RECIPE':
        //     return {...state, ...recipes}
        default: return state;
    }
}, initialState);

export default reducer;