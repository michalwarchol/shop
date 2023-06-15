import React, { useMemo, useRef } from "react";

import styles from "./OrdersHistory.styles.scss";
import Order from "components/Order/Order";
import closeIcon from "src/assets/images/close-x.svg";
import Button from "components/Button/Button";

const OrdersHistoryView = ({ orders, redirect }) => {
  const ordersRef = useRef(null);

  const outsideClick = (e) => {
    if (ordersRef && ordersRef.current && !ordersRef.current.contains(e.target)) {
      redirect();
    }
  };

  const renderedOrders = orders
    ? orders.map((order) => (
        <Order
          order={order}
          key={order.id}
        />
      ))
    : null;

  return (
    <div
      className={styles.wrapper}
      onClick={outsideClick}
    >
      <div
        className={styles.inner}
        ref={ordersRef}
      >
        <Button
          onClick={redirect}
          className={styles.closeButton}
        >
          <img
            src={closeIcon}
            alt="X"
          />
        </Button>
        {renderedOrders}
      </div>
    </div>
  );
};

export default OrdersHistoryView;
