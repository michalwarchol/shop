import React, { useContext } from "react";

import styles from "./Cart.styles.scss";
import { UserContext } from "providers/UserProvider";
import Button from "components/Button/Button";
import CartItem from "components/CartItem/CartItem";

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user.bucket);

  if (!user) {
    return null;
  }

  const increaseAmount = (index) => {
    setUser({
      ...user,
      bucket: [
        ...user.bucket.slice(0, index),
        { ...user.bucket[index], amount: user.bucket[index].amount + 1 },
        ...user.bucket.slice(index + 1),
      ],
    });
  };

  const decreaseAmount = (index) => {
    if (user.bucket[index].amount < 2) {
      return;
    }
    setUser({
      ...user,
      bucket: [
        ...user.bucket.slice(0, index),
        { ...user.bucket[index], amount: user.bucket[index].amount - 1 },
        ...user.bucket.slice(index + 1),
      ],
    });
  };

  const removeItem = (index) => {
    setUser({
      ...user,
      bucket: user.bucket.filter((item, currentIndex) => currentIndex !== index),
    });
  };

  const renderedCart = user.bucket.map((item, index) => (
    <CartItem
      item={item}
      key={item.id}
      increaseAmount={() => increaseAmount(index)}
      decreaseAmount={() => decreaseAmount(index)}
      removeItem={() => removeItem(index)}
    />
  ));

  const sumCart = () => {
    return Math.round(user.bucket.reduce((acc, current) => (acc += current.amount * current.price), 0) * 100) / 100;
  };

  const buy = () => {
    // TODO
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartInner}>
        {renderedCart}
        <div className={styles.toPay}>
          <div>Do zapłaty: </div>
          <div>{sumCart()} zł</div>
        </div>
        <Button
          className={styles.buyButton}
          onClick={buy}
        >
          PRZEJDŹ DO KASY
        </Button>
      </div>
    </div>
  );
};

export default Cart;
