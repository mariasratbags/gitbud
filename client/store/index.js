import { createStore } from 'redux';
import reducer from './reducers';

/*
  grabs all the reducer from store/reducers.js and creates a store with it. A store manages state.
 */
const store = createStore(reducer);

export default store;
