import { all } from 'redux-saga/effects';
import { updateSimpleWatcher } from '../myComponent/sagas';
import { filmsWatcher } from 'Src/films/sagas';

const sagas = function* () {
  yield all([
    updateSimpleWatcher(),
    filmsWatcher()
  ])
};

export { sagas }
