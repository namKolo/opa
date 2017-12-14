// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMdw from 'redux-saga';

import type { Store } from 'types';

import reducer from './reducers';
import saga from './sagas';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const sagaMdw = createSagaMdw();
const mdws = [thunk, sagaMdw];
const createAppStore = (): Store => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(...mdws)));
  sagaMdw.run(saga);
  return store;
};

export default createAppStore;
