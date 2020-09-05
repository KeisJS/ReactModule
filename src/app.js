import './app.scss';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import { Preloader } from 'Src/preloader';
import { FilmsLazy } from 'Src/films/lazy';
import { Review } from 'Src/review';

function App() {
  return (
    <div className={ `container ${ styles.app }` }>
      <div className="row">
        <Provider store={ store }>
          <Router>
            <Suspense fallback={ <Preloader text="Загрузка приложения"></Preloader> }>
              <Switch>
                <Route path="/review/:filmId" component={ Review }></Route>
                <Route path="/" component={ FilmsLazy }></Route>
              </Switch>
            </Suspense>
          </Router>
        </Provider>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

