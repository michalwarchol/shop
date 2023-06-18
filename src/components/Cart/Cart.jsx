import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


import { UserContext } from "providers/UserProvider";
import Button from "components/Button/Button";
import CartItem from "components/CartItem/CartItem";
import { DataContext } from "providers/DataProvider/DataProvider";

import styles from "./Cart.styles.scss";

const Cart = ({ products, product, buy, removeOrderEntry, updateOrderEntry }) => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const { bucket } = useContext(DataContext);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [buyNowAmount, setBuyNowAmount] = useState(parseInt(params.amount));

  if (!user) {
    return null;
  }

  const increaseAmount = (index) => {
    if(product) {
      if (product && product.availableAmount > buyNowAmount) {
        setBuyNowAmount(buyNowAmount + 1);
        return;
      }
      return;
    }
    updateOrderEntry(index, true);

    // setUser({
    //   ...user,
    //   bucket: [
    //     ...user.bucket.slice(0, index),
    //     { ...user.bucket[index], amount: user.bucket[index].amount + 1 },
    //     ...user.bucket.slice(index + 1),
    //   ],
    // });
  };

  const decreaseAmount = (index) => {
    if (product && buyNowAmount < 2) {
      return;
    }
    
    if (product && buyNowAmount >= 2) {
      setBuyNowAmount(buyNowAmount - 1);
      return;
    }

    updateOrderEntry(index, false);


    // if (user.bucket[index].amount < 2) {
    //   return;
    // }
    // setUser({
    //   ...user,
    //   bucket: [
    //     ...user.bucket.slice(0, index),
    //     { ...user.bucket[index], amount: user.bucket[index].amount - 1 },
    //     ...user.bucket.slice(index + 1),
    //   ],
    // });
  };

  const removeItem = (id) => {
    if (product) {
      navigate(`/product?id=${product.id}`);
      return;
    }

    removeOrderEntry(id);
  };

  const renderedCart = () => {
    if(product) {
      return (
        <CartItem
          item={{...product, amount: buyNowAmount}}
          increaseAmount={() => increaseAmount(0)}
          decreaseAmount={() => decreaseAmount(0)}
          removeItem={() => removeItem(0)}
        />  
      )
    }

    return products.map((item, index) => (
      <CartItem
        item={item}
        key={item.id}
        increaseAmount={() => increaseAmount(index)}
        decreaseAmount={() => decreaseAmount(index)}
        removeItem={() => removeItem(item.entryId)}
      />
    ));
  }

  const sumCart = () => {
    if (product) {
      return product.price * buyNowAmount;
    }

    return Math.round(products.reduce((acc, current) => (acc += current.amount * current.price), 0) * 100) / 100;
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartInner}>
        {renderedCart()}
        <div className={styles.toPay}>
          <div>Do zapłaty: </div>
          <div>{sumCart()} zł</div>
        </div>
        <Button
          className={styles.buyButton}
          onClick={() => {
            if(bucket.length !== 0) {
              buy(product ? {...product, amount: buyNowAmount} : null);
            }
          }}
        >
          {bucket.length === 0 ? 'BRAK PRODUKTÓW' : 'ZłÓŻ ZAMÓWIENIE'}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
