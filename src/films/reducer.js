import { createActions, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { connectServerFilmsData } from 'Src/films/api';

const filmsActions = createActions({
  list: {
    get: undefined,
    updateByServer: connectServerFilmsData,
    cancel: undefined
  },
  select: undefined
}, { prefix: 'films' });

const films = handleActions({
  [filmsActions.list.updateByServer]: (state, { payload }) => payload
}, []);

const active = handleActions({
  [filmsActions.select]: (state, { payload }) => payload,
  [filmsActions.list.updateByServer]: (state, { payload }) => payload[0].id
}, 0);

const filmsList = combineReducers({
  films,
  active
});

export { filmsActions, filmsList }

