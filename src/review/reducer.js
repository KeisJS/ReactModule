import { combineReducers } from 'redux';
import { filmReducer } from './reducers/film';
import { reviewReducer } from 'Src/review/reducers/review';

export const review = combineReducers({
  film: filmReducer,
  review: reviewReducer
})


