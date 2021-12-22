import {combineReducers,createStore} from 'redux';
import userReducer from './reducers/userReducer';
import recipesReducer from './reducers/recipesReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({userReducer, recipesReducer});
const store = createStore(reducer,composeWithDevTools());
window.store = store;
export default store;

