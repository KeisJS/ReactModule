import React, { useEffect, useState } from 'react';
import { simpleAction, selectSimpleData } from './reducer';
import { connect } from 'react-redux';
import { Preloader } from 'Src/preloader';
import { status } from 'Src/status';

const stateToProps = state => ({ simpleData: selectSimpleData(state) });
const dispatchToProps = dispatch => ({ updateSimpleData: value => { dispatch(simpleAction.update(value)) } });

function MyComponent({ simpleData, updateSimpleData }) {
  useEffect(() => {
    setTimeout(() => {
      updateSimpleData(`data from component; previous data ${simpleData}`);
      setStatus('success');
    }, 3000)
  }, []);

  const [ currentStatus, setStatus ] = useState('pending');

  return (
    <>
      { status.isPending(currentStatus) && <Preloader text='Идет загрузка данных'></Preloader> }
      { status.isSuccess(currentStatus) && (
        <div>
          My component content ...
          <br/>
          Data: { simpleData }
        </div>
      )}
    </>
  );
}

MyComponent = connect(stateToProps, dispatchToProps)(MyComponent);

export { MyComponent, MyComponent as default }
