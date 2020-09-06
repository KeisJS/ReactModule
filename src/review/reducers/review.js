import { handleActions } from 'redux-actions';
import { reviewActions } from 'Src/review/actions';
import { STATUS } from 'Src/status';
import { combineReducers } from 'redux';

const data = handleActions({
  [reviewActions.review.save]: (state, { payload }) => {
    return payload;
  }
}, '');

const status = handleActions({
  [reviewActions.review.save]: () => STATUS.pending,
  [reviewActions.review.updateByServer]: () => STATUS.success
}, STATUS.empty);

export const reviewReducer = combineReducers({
  data,
  status
})
