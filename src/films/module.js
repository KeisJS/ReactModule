import { Films } from 'Src/films/index';
import dynamic from '@redux-dynostore/react-redux';
import { attachReducer } from '@redux-dynostore/core';
import { runSaga } from '@redux-dynostore/redux-saga';
import { filmsWatcher } from 'Src/films/sagas';
import { films } from 'Src/films/reducer';

const module = dynamic(
  'films',
  runSaga(filmsWatcher),
  attachReducer(films)
)(Films);

export { module as default }
