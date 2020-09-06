import React, { useEffect } from 'react';
import styles from './styles.module.scss'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filmsActions } from 'Src/films/reducer';
import { selectFilms, selectActiveFilm, selectStatus } from 'Src/films/selectors';
import { status } from 'Src/status';
import { store } from 'Src/app/store';
import { Link } from 'react-router-dom';
import { FilmsList } from 'Src/films/filmsList';
import { Preloader } from 'Src/preloader';

function Films ({ getFilms, cancelGetFilms, films, activeFilm, selectFilm, currentStatus }) {
  useEffect(() => {
    getFilms();

    return () => {
      cancelGetFilms();
      store.detachReducers(['films']);
      store.cancelSagas(['films']);
    }
  }, []);

  const history = useHistory();

  return (
    <div className="container">
      <div className="row">
        { status.isPending(currentStatus) && <Preloader text='Films loading'></Preloader> }
        { status.isSuccess(currentStatus) && (
          <>
            <div className={ `col-4 col-sm-4 col-lg-2 ${ styles.navLeft }` }>
              <FilmsList extendClass={ styles.navLeft__items }
                         films={ films }
                         activeId={ activeFilm.id }
                         selectFilm={ selectFilm }
              />
              <div className={ styles.navLeft__button }>
                <button type="button" className={ `btn btn-primary ${ styles.filmSelectButton }` }
                        onClick={() => { history.push(`/review/${ activeFilm.urlId }`) }}>
                  Select episode
                </button>
              </div>
            </div>
            <div className="col-8 col-sm-8 col-lg-10">
              <div className={ styles.swLogo }></div>
              <article className={ styles.filmContent }>
                <h1 className={ styles.filmTitle }>{ activeFilm.title }</h1>
                <div className={ styles.filmDescription }>
                  <p>
                    { activeFilm.intro }
                  </p>
                </div>
              </article>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProp = state => {
  return ({
    films: selectFilms(state),
    activeFilm: selectActiveFilm(state),
    currentStatus: selectStatus(state)
  })
};
const mapDispatchToProps = dispatch => ({
  getFilms: () => dispatch(filmsActions.list.get()),
  cancelGetFilms: () => dispatch(filmsActions.list.cancel()),
  selectFilm: (filmId, activeFilmId) => {
    if (filmId !== activeFilmId) {
      dispatch(filmsActions.select(filmId))
    }
  }
})

Films = connect(mapStateToProp, mapDispatchToProps)(Films)

export { Films, Films as default }
