import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';
import createSagaMiddleWare from 'redux-saga';
import { sagas } from './sagas';

const sagaMiddleware = createSagaMiddleWare();
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagas);

export { store };