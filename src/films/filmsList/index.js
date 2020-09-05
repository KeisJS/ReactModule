import styles from './styles.module.scss';
import React from 'react';

function FilmsList({ extendClass = '', films = [], activeId, selectFilm }) {

  return (
    <nav className={ extendClass }>
      { films.map(({ id, title }) => {
        const activeClass = id === activeId ? styles.item_active : ''

        return (
          <div className={ `${ styles.item } ${ activeClass }` } key={ id } onClick={ () => selectFilm(id, activeId) }>
            { title }
          </div>
        )
      }) }
    </nav>
  )
}

export { FilmsList }
