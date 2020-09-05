import { all } from 'redux-saga/effects';
import { updateSimpleWatcher } from '../myComponent/sagas';

const sagas = function* () {
  yield all([
    updateSimpleWatcher()
  ])
};

export { sagas }
