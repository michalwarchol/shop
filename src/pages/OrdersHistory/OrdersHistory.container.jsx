import React, { useEffect, useState } from "react";
import View from "./OrdersHistory.view";
import { useNavigate } from "react-router-dom";

const OrdersHistoryPage = () => {
  const [orders, setOrders] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // TODO fetch orders
      setOrders([
        {
          id: "1",
          products: [
            { name: "Jagermaister 0,7L", price: 69.99, amount: 2 },
            { name: "Bacardi 0,7L", price: 59.99, amount: 1 },
          ],
          totalPrice: 199.97,
        },
        {
          id: "2",
          products: [
            { name: "Komes 0,5L", price: 9.99, amount: 3 },
            { name: "Bacardi 0,7L", price: 59.99, amount: 2 },
          ],
          totalPrice: 149.95,
        },
      ]);
    })();
  }, []);

  const redirect = () => {
    navigate("..");
  };

  return (
    <View
      orders={orders}
      redirect={redirect}
    />
  );
};

export default OrdersHistoryPage;
