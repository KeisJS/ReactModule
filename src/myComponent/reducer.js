import { createActions, handleActions } from 'redux-actions';

const simpleAction = createActions({
  UPDATE: undefined,
  SET: undefined
}, { prefix: 'SIMPLE'} );

const reducer = handleActions({
  [simpleAction.set]: (stateValue, { payload }) => payload
}, 'init data');

function selectSimpleData(state) {
  return state.simple
}

export { reducer, simpleAction, selectSimpleData };