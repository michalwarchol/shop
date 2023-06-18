import React from "react";

import styles from "./CartItem.styles.scss";
import Button from "components/Button/Button";
import removeIcon from "src/assets/images/remove-x.svg";

const CartItem = ({ item, increaseAmount, decreaseAmount, removeItem }) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemLeft}>
        <img
          src={`data:image/jpg;charset=utf8;base64,${item.image}`}
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
          <Button onClick={() => removeItem(item.id)}>
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
