import { takeEvery, put } from 'redux-saga/effects';
import { simpleAction } from './reducer';

function* updateSimpleSaga({ payload }) {
  yield put(simpleAction.set('saga value; ' + payload))
}

function* updateSimpleWatcher() {
  yield takeEvery(simpleAction.update, updateSimpleSaga);
}

export { updateSimpleWatcher }