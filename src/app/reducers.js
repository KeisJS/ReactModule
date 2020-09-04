import { combineReducers } from 'redux';
import { reducer as simple } from '../myComponent/reducer';
import { filmsList } from 'Src/films/reducer';

const reducers = combineReducers({
  simple,
  filmsList
});

export { reducers }
