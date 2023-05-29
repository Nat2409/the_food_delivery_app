import React from 'react';
import styles from './Shop.module.css';
import goods from '../../data';

export default function Shop() {
  const onAddToCart = e => {
    const myChoise = e;
    const itemsInLocalStorage = JSON.parse(localStorage.getItem('items'));

    if (itemsInLocalStorage) {
      !itemsInLocalStorage.includes(myChoise) &&
        itemsInLocalStorage.push(myChoise);

      localStorage.setItem('items', JSON.stringify(itemsInLocalStorage));
    } else {
      localStorage.setItem('items', JSON.stringify([myChoise]));
    }
  };
  return (
    <div className={styles.shops__container}>
      <section className={styles.shops__section}>
        <h2 className={styles.shops__title}>Shops:</h2>
        <ul className={styles.shops__list}>
          <li className={styles.shops__item}>
            <button className={styles.shops__button}>Mc Donny</button>
          </li>
          <li className={styles.shops__item}>
            <button className={styles.shops__button}>CFK</button>
          </li>
          <li className={styles.shops__item}>
            <button className={styles.shops__button}>etc..</button>
          </li>
          <li className={styles.shops__item}>
            <button className={styles.shops__button}>etc..</button>
          </li>
          <li className={styles.shops__item}>
            <button className={styles.shops__button}>etc..</button>
          </li>
        </ul>
      </section>
      <section className={styles.shops__section}>
        <ul className={styles.goods__list}>
          {goods.map(good => {
            return (
              <li key={good.id} className={styles.goods__item}>
                <img
                  className={styles.goods__image}
                  src={good.image}
                  alt={good.name}
                />
                <p className={styles.goods__name}>{good.name}</p>
                <p className={styles.goods__button_position}>
                  <button
                    className={styles.goods__button}
                    type="button"
                    // data={good.id}
                    onClick={() => onAddToCart(good.id)}
                  >
                    add to Cart
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
