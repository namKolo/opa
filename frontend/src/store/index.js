import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMdw from 'redux-saga';

import reducer from 'reducer';
import saga from 'sagas';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const sagaMdw = createSagaMdw();
const mdws = [thunk, sagaMdw];
const createAppStore = () => createStore(reducer, composeEnhancers(applyMiddleware(...mdws)));

// run all sagas
sagaMdw.run(saga);

export default createAppStore;
