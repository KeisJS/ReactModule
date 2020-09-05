import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';
import createSagaMiddleWare from 'redux-saga';
import { sagas } from './sagas';
import dynastore, { dynamicReducers } from '@redux-dynostore/core';
import { dynamicSagas } from '@redux-dynostore/redux-saga';

const sagaMiddleware = createSagaMiddleWare();
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(sagaMiddleware),
  dynastore(
    dynamicSagas(sagaMiddleware),
    dynamicReducers()
  )
));

sagaMiddleware.run(sagas);

export { store };
