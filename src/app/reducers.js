import { combineReducers } from 'redux';
import { reducer as simple } from '../myComponent/reducer';

const reducers = combineReducers({
  simple
});

export { reducers }
