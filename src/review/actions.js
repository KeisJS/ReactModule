import { createActions } from 'redux-actions';
import { mapSeverDataFilm } from 'Src/films/api';

export const reviewActions = createActions({
  film: {
    get: undefined,
    cancel: undefined,
    updateByServer: mapSeverDataFilm
  },
  review: {
    save: undefined,
    updateByServer: undefined
  }
}, { prefix: 'review' });
