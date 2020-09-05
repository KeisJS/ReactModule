import { handleActions } from 'redux-actions';
import { STATUS } from 'Src/status';
import { combineReducers } from 'redux';
import { reviewActions } from 'Src/review/actions';

const data = handleActions({
  [reviewActions.film.updateByServer]: (action, { payload }) => {

    return {
      title: payload.title
    }
  }
}, {
  title: ''
})

const status = handleActions({
  [reviewActions.film.get]: () => STATUS.pending,
  [reviewActions.film.updateByServer]: () => STATUS.success
}, STATUS.empty)

export const filmReducer = combineReducers({
  data,
  status
});
