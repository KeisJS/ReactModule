import { createActions, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const filmsActions = createActions({
  list: {
    get: undefined,
    updateByServer: undefined,
    cancel: undefined
  },
  selectFilm: undefined
}, { prefix: 'films' });

const films = handleActions({
  [filmsActions.list.updateByServer]: (state, { payload }) => payload
}, []);

const active = handleActions({
  [filmsActions.selectFilm]: (state, { payload }) => payload
}, 0);

const filmsList = combineReducers({
  films,
  active
});

export { filmsActions, filmsList }

