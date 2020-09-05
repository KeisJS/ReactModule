import { takeLatest, race, takeEvery, call, put } from 'redux-saga/effects';
import { filmsActions } from 'Src/films/reducer';
import { getFilms } from 'Src/films/api';

function* updateFilms() {
  try {
    const { data: serverDataFilms } = yield call(getFilms);

    yield put(filmsActions.list.updateByServer(serverDataFilms));
  } catch(e) {
    console.log({ e })
  }
}

export function* filmsWatcher() {
  yield race([
    takeLatest(filmsActions.list.get, updateFilms),
    takeEvery(filmsActions.list.cancel, () => {})
  ])
}
