import './app.scss';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { MyComponentLazy } from "./myComponent/lazy";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback='Loading ...'>
          <Switch>
            <Route path="/myComponent" component={ MyComponentLazy }></Route>
            <Route path="/" render={() => <div>root route ... <br /><Link to='/myComponent'>to MyComponent</Link></div>}></Route>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

