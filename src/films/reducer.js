import { createActions, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { connectServerFilmsData } from 'Src/films/api';
import { STATUS } from 'Src/status';

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

const activeId = handleActions({
  [filmsActions.select]: (state, { payload }) => payload,
  [filmsActions.list.updateByServer]: (state, { payload }) => payload[0].id
}, 0);

const status = handleActions({
  [filmsActions.list.updateByServer]: () => STATUS.success
}, STATUS.pending)

const filmsList = combineReducers({
  films,
  activeId,
  status
});

export { filmsActions, filmsList }

