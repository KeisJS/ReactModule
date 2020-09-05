import dynamic from '@redux-dynostore/react-redux';
import { attachReducer } from '@redux-dynostore/core';
import { runSaga } from '@redux-dynostore/redux-saga';
import { Review } from 'Src/review/index';
import { review } from 'Src/review/reducer';
import { reviewFilmWatcher } from 'Src/review/sagas';

const module =dynamic(
  'review',
  attachReducer(review),
  runSaga(reviewFilmWatcher)
)(Review);

export { module as default, module as Review }
