import React, { useMemo } from "react";

import styles from "./OrdersHistory.styles.scss";
import Order from "components/Order/Order";
import closeIcon from "src/assets/images/close-x.svg";
import Button from "components/Button/Button";

const OrdersHistoryView = ({ orders, redirect }) => {
  const renderedOrders = orders
    ? orders.map((order) => (
        <Order
          order={order}
          key={order.id}
        />
      ))
    : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
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
