import React from "react";

import styles from "./Order.styles.scss";

const Order = ({ order: { id, products, totalPrice } }) => {
  const renderedProducts = products.map((product) => (
    <div
      className={styles.product}
      key={product.name}
    >
      <div className={styles.productName}>{product.product.name}</div>
      <div className={styles.productDetails}>
        <div className={styles.productAmount}>{product.amount}x</div>
        <div className={styles.productPrice}>{product.product.price} zł</div>
        <div className={styles.totalPrice}>{product.amount * product.product.price} zł</div>
      </div>
    </div>
  ));

  return (
    <div className={styles.order}>
      <div className={styles.orderId}>ZAMÓWIENIE {id}</div>
      {renderedProducts}
      <div className={styles.totalPrice}>{totalPrice} zł</div>
    </div>
  );
};

export default Order;
