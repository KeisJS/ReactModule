import styles from './styles.module.scss';
import React from 'react';

function FilmsList({ extendClass = '' }) {
  return (
    <nav className={ extendClass }>
      { Array(7).fill(null).map((v, i) => <div className={ styles.item } key={ i }>Some film name ...</div>) }
      <div className={ `${ styles.item } ${ styles.item_active }` }>Some film name ...</div>
    </nav>
  )
}

export { FilmsList }
