import { createActions } from 'redux-actions';
import { STATUS } from 'Src/status';

export const reviewActions = createActions({
  film: {
    get: undefined,
    cancel: undefined,
    success: undefined
  },
  review: {
    save: undefined,
    status: {
      success: undefined
    }
  }
});
