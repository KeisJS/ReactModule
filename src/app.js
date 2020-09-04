import './app.scss';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { MyComponentLazy } from "./myComponent/lazy";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styles from './app.module.scss';
import { Preloader } from 'Src/preloader';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Suspense fallback={ <Preloader text="Загрузка приложения"></Preloader> }>
          <Switch>
            <Route path="/myComponent" component={ MyComponentLazy }></Route>
            <Route path="/"
                   render={ () => <div>root route ... <br/><Link to='/myComponent'>to MyComponent</Link>
                   </div> }></Route>
          </Switch>
        </Suspense>
      </Router>
      <div className={ `container ${ styles.app }` }>
        <div className="row">
          <div className={ `col-4 col-sm-4 col-lg-2 ${ styles.navLeft }` }>
            <nav className={ styles.navLeft__items }>
              { Array(7).fill(null).map((v, i) => <div className={ styles.navItem } key={ i }>Some film name ...</div>) }
              <div className={ `${ styles.navItem } ${ styles.navItem__active }` }>Some film name ...</div>
            </nav>
            <div className={ styles.navLeft__button }>
              <button type="button" className={ `btn btn-primary ${ styles.filmSelectButton }` }>Select episode</button>
            </div>
          </div>
          <div className="col-8 col-sm-8 col-lg-10">
            <div className={ styles.swLogo }></div>
            <article className={ styles.filmContent }>
              <h1 className={ styles.filmTitle }>Some title</h1>
              <div className={ styles.filmDescription }>
                <p>
                  { 'It is a dark time for theRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....' }
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Provider>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

