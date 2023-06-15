import React from "react";

import styles from "./CartItem.styles.scss";
import Button from "components/Button/Button";
import removeIcon from "src/assets/images/remove-x.svg";

const CartItem = ({ item, increaseAmount, decreaseAmount, removeItem }) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemLeft}>
        <img
          src="https://kultowealkohole.pl/uploads/images/3e/57c5fee92cf09.png"
          alt={item.name}
        />
        <div className={styles.itemName}>{item.name}</div>
      </div>
      <div className={styles.itemRight}>
        <div className={styles.amountWrapper}>
          <Button
            className={styles.amountButton}
            onClick={decreaseAmount}
          >
            -
          </Button>
          <div className={styles.amount}>{item.amount}</div>
          <Button
            className={styles.amountButton}
            onClick={increaseAmount}
          >
            +
          </Button>
        </div>
        <div className={styles.itemPrice}>{Math.round(item.amount * item.price * 100) / 100} zł</div>
        <div className={styles.deleteItem}>
          <Button onClick={removeItem}>
            <img
              src={removeIcon}
              alt="remove"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
