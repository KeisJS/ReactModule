import { useEffect, default as React } from 'react';
import { simpleAction, selectSimpleData } from './reducer';
import { connect } from 'react-redux';

const stateToProps = state => ({ simpleData: selectSimpleData(state) });
const dispatchToProps = dispatch => ({ updateSimpleData: value => { dispatch(simpleAction.update(value)) } });

function MyComponent({ simpleData, updateSimpleData }) {
  useEffect(() => {
    setTimeout(() => {
      updateSimpleData(`data from component; previous data ${simpleData}`);
    }, 3000)
  }, []);

  return (
    <div>
      My component content ...
      <br/>
      Data: { simpleData }
    </div>
  );
}

MyComponent = connect(stateToProps, dispatchToProps)(MyComponent);

export { MyComponent, MyComponent as default }
