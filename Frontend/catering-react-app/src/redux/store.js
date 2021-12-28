import {combineReducers,createStore} from 'redux';
import userReducer from './reducers/userReducer';
import recipesReducer from './reducers/recipesReducer';
import eventsReducer from './reducers/eventsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({userReducer, recipesReducer, eventsReducer});
const store = createStore(reducer,composeWithDevTools());
window.store = store;
export default store;

