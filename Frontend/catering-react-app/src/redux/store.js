import {combineReducers,createStore} from 'redux';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({userReducer});
const store = createStore(reducer);
window.store = store;
export default store;

