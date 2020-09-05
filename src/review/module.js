import dynamic from '@redux-dynostore/react-redux';
import { attachReducer } from '@redux-dynostore/core';
import { runSaga } from '@redux-dynostore/redux-saga';
import { Review } from 'Src/review/index';
import { review } from 'Src/review/reducer';

const module =dynamic(
  'review',
  attachReducer(review)
)(Review);

export { module as default, module as Review }
