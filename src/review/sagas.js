import { takeLatest, takeEvery, call, race, put, delay, all } from 'redux-saga/effects';
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

function* reviewFilmWatcher() {
  yield race([
    takeLatest(reviewActions.film.get, getFilmSaga),
    takeEvery(reviewActions.film.cancel, () => {})
  ])
}

function* saveReviewSaga({ payload }) {
  console.log('Save review: ' + payload);
  yield delay(2000);
  yield put(reviewActions.review.updateByServer())
}

function* saveReviewWatcher() {
  yield takeEvery(reviewActions.review.save, saveReviewSaga);
}

export function* reviewSagas() {
  yield all([
    reviewFilmWatcher(),
    saveReviewWatcher()
  ])
}
