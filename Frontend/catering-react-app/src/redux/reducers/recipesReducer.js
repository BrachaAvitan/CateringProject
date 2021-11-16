import produce from 'immer';

const initialState = {
    recipes:[] = null,
}

const reducer = produce((state,action)=>{
    switch(action.type){
        case 'SET_RECIPES':
            return {... state, recipes: action.paylod}
        // case 'SET_RECIPE':
        //     return {...state, ...recipes}
        default: return state;
    }
},initialState);

export default reducer;