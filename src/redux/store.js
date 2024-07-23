// src/store.js
import { createStore } from 'redux';
import Reducer from './reducers/reducers';

const store = createStore(Reducer);

export default store;
