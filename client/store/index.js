import { createStore } from 'redux';
import reducer from './reducers';

//create the store; value is what reducer returns
const store = createStore(reducer);

export default store;
