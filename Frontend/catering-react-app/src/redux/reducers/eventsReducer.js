import produce from 'immer';

const initialState = {
    events: [],
    productsToEvent: [],
    recipesToOrder: [],
    recipesOrder: []
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        case 'UPDATE_EVENT':
                let updatedEvent = action.payload;
                debugger
                const filtered = state.events.filter((it) => it.eventId !== updatedEvent.eventId);
                return {...state, events: [...filtered, updatedEvent]}
        case 'SET_PRODUCTS_TO_EVENT':
            return {...state, productsToEvent: action.payload};
        case 'SET_RECIPES_TO_ORDER':
            return {...state, recipesToOrder: action.payload};
        case 'SET_RECIPES_ORDER':
            return {...state, recipesOrder: action.payload};
        default:
            return state;
    }
}, initialState);

export default reducer;