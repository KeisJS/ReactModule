import React, { useEffect } from 'react';
import styles from './styles.module.scss'
import { FilmsList } from 'Src/films/filmsList';
import { connect } from 'react-redux';
import { filmsActions } from 'Src/films/reducer';
import { selectFilms, selectActiveFilmId } from 'Src/films/selectors';

function Films ({ getFilms, cancelGetFilms, films, activeId, selectFilm }) {
  useEffect(() => {
    getFilms();

    return () => cancelGetFilms()
  }, [])

  return (
    <div className="row">
      <div className={ `col-4 col-sm-4 col-lg-2 ${ styles.navLeft }` }>
        <FilmsList extendClass={ styles.navLeft__items }
                   films={ films }
                   { ...{ activeId, selectFilm }}
        />
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
  )
}

const mapStateToProp = state => {
  return ({
    films: selectFilms(state),
    activeId: selectActiveFilmId(state)
  })
};
const mapDispatchToProps = dispatch => ({
  getFilms: () => dispatch(filmsActions.list.get()),
  cancelGetFilms: () => dispatch(filmsActions.list.cancel()),
  selectFilm: filmId => dispatch(filmsActions.select(filmId))
})

Films = connect(mapStateToProp, mapDispatchToProps)(Films)

export { Films, Films as default }
