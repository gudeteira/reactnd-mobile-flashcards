import {compose, createStore} from 'redux';
import middleware from '../middleware';
import decks from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(decks, composeEnhancers(middleware));

export default store;