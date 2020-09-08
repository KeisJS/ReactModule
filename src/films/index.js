import React, { useEffect } from 'react';
import styles from './styles.module.scss'
import { connect, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filmsActions } from 'Src/films/reducer';
import { selectFilms, selectActiveFilm, selectStatus } from 'Src/films/selectors';
import { status } from 'Src/status';
import { store } from 'Src/app/store';
import { FilmsList } from 'Src/films/filmsList';
import { Preloader } from 'Src/preloader';

function Films ({  }) {
  const history = useHistory();

  const { films, activeFilm, currentStatus } = useSelector(state => {
    return ({
      films: selectFilms(state),
      activeFilm: selectActiveFilm(state),
      currentStatus: selectStatus(state)
    })
  });

  const dispatch = useDispatch();

  const selectFilm = (filmId, activeFilmId) => {
    if (filmId !== activeFilmId) {
      dispatch(filmsActions.select(filmId))
    }
  }

  useEffect(() => {
    dispatch(filmsActions.list.get());

    return () => {
      dispatch(filmsActions.list.cancel());
      store.detachReducers(['films']);
      store.cancelSagas(['films']);
    }
  }, []);

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

export { Films, Films as default }
