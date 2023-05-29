// import React from 'react';
import React, { useState, useEffect } from 'react';
import styles from './ShoppingCart.module.css';
import goods from '../../data';

export default function ShoppingCart() {
  const [myGoods, setMyGoods] = useState([]);
  const [itemsFromLocalStorage, setItemsFromLocalStorage] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const itemsInLocalStorage = JSON.parse(localStorage.getItem('items'));
    console.log('result0', itemsFromLocalStorage);
    if (itemsInLocalStorage) {
      const result = itemsInLocalStorage.map(goodId => {
        const found = goods.find(good => good.id === goodId);
        return { ...found, count: 1 };
      });

      setMyGoods(result);
      console.log('result', result);
      console.log('myGoods', myGoods);
    }
  }, []);
  useEffect(() => {
    countTotalPrice();
  });

  console.log('my goods1', myGoods);
  const onIncrement = (count, amount, id) => {
    if (count < amount) {
      const updatedResult = myGoods.map(good => {
        if (good.id === id) {
          return { ...good, count: good.count + 1 };
        }
        return good;
      });

      setMyGoods(updatedResult);
    }
  };
  const onDecrement = (count, id) => {
    if (count > 1) {
      const updatedRuselt = myGoods.map(good => {
        if (good.id === id) {
          return { ...good, count: good.count - 1 };
        }
        return good;
      });
      setMyGoods(updatedRuselt);
    }
  };
  const onRemove = id => {
    console.log('removeId', id);
    const result = myGoods.filter(good => good.id !== id);
    setMyGoods(result);
    localStorage.setItem('items', JSON.stringify(result.map(good => good.id)));
  };
  const countTotalPrice = () => {
    const totalResult = myGoods.reduce((result, { count, price }) => {
      result = result + count * price;
      return result;
    }, 0);
    setTotalPrice(totalResult);
  };
  return (
    <div className={styles.cart__container}>
      <section className={styles.cart__section}>
        <form type="submit">
          <label className={styles.cart__label}>
            Name:
            <br />
            <input
              className={styles.cart__input}
              type="name"
              placeholder="enter your name"
            ></input>
          </label>
          <br />
          <label>
            E-mail:
            <br />
            <input
              className={styles.cart__input}
              type="email"
              placeholder="enter your e-mail"
            ></input>
          </label>
          <br />
          <label>
            Phone:
            <br />
            <input
              className={styles.cart__input}
              type="tel"
              placeholder="enter your phone"
            ></input>
          </label>{' '}
          <br />
          <label>
            Address:
            <br />
            <input
              className={styles.cart__input}
              type="text"
              placeholder="enter your address"
            ></input>
          </label>
        </form>
      </section>
      <section className={styles.cart__section}>
        <ul className={styles.goods__list}>
          {myGoods &&
            myGoods.map(({ name, image, id, amount, price, count }) => {
              return (
                <li key={id} className={styles.goods__item}>
                  <img className={styles.goods__image} src={image} alt={name} />
                  <div>
                    <p className={styles.goods__name}>{name}</p>
                    <p>Price: {price * count}</p>
                    <div className={styles.select__wrap}>
                      <p className={styles.select__amount}>{count}</p>
                      <div className={styles.button__wrap}>
                        <button
                          className={styles.select__button}
                          type="button"
                          onClick={() => onIncrement(count, amount, id)}
                        >
                          &#9650;
                        </button>
                        <button
                          className={styles.select__button}
                          type="button"
                          onClick={() => onDecrement(count, id)}
                        >
                          &#9660;
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.remove__button}
                      onClick={() => onRemove(id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>
      <section className={styles.cart__total}>
        <p className={styles.total__price}>Total price: {totalPrice}</p>
        <button className={styles.total__submit} type="submit">
          Submit
        </button>
      </section>
    </div>
  );
}
