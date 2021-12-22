import produce from 'immer';

const initialState = {
    recipes:[],
    products:[],
    // menuTypes:[],
}

const reducer = produce((state,action)=>{
    switch(action.type){
        case 'SET_RECIPES':
            return {... state, recipes: action.payload}
        case 'SET_PRODUCTS':
            return {... state, products: action.payload}
        // case 'SET_RECIPE':
        //     return {...state, ...recipes}
        default: return state;
    }
},initialState);

export default reducer;