import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

export function Preloader({ text }) {
  const [count, setCount] = useState(1);
  const loading = '...';

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCount(count <= 3 ? count + 1 : 0);
    }, 400);

    return () => {
      clearInterval(intervalId)
    }
  })

  return createPortal((
    <div className={ styles.preloader }>
      <span className={ styles.preloader__text }>{ text }&nbsp;</span>
      <span className={ styles.preloader__count }>{ loading.substr(0, count) }</span>
    </div>
  ), document.body)
}
