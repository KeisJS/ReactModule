import { takeLatest, takeEvery, call, race, put } from 'redux-saga/effects';
import { reviewActions } from 'Src/review/actions';
import { getFilm  } from 'Src/films/api';

function* getFilmSaga({ payload }) {
  try {
    const { data: serverDataFilm } = yield call(getFilm, payload);

    yield put(reviewActions.film.updateByServer(serverDataFilm));
  } catch(e) {
    console.log(e)
  }
}

export function* reviewFilmWatcher() {
  yield race([
    takeLatest(reviewActions.film.get, getFilmSaga),
    takeEvery(reviewActions.film.cancel, () => {})
  ])
}
