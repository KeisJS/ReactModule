import { takeLatest, race, take } from 'redux-saga/effects';
import { filmsActions } from 'Src/films/reducer';

function* updateFilms() {
  console.log('in update films saga');
}

export function* filmsWatcher() {
  yield race([
    takeLatest(filmsActions.list.get, updateFilms),
    take(filmsActions.list.cancel)
  ])
}
