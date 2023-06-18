import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "providers/DataProvider/DataProvider";
import config from 'src/config';

import View from "./OrdersHistory.view";

const OrdersHistoryPage = ({ setShowOrders }) => {
  const [orders, setOrders] = useState();
  const { orders: fetchedOrders } = useContext(DataContext);
  const filteredOrders = fetchedOrders.filter((order) => order.stateId === '3');

  const getOrderEntries = async (orderId) => {
    const response = await fetch(`${config.apiUrl}/order_entries/${orderId}`);
    const res = await response.json();

    return res.data;
  }

  const getOrderProducts = async (productId) => {
    const response = await fetch(`${config.apiUrl}/products/${productId}`);
    const res = await response.json();

    return res.product;
  }

  let uniqueArray = function(arr){
	let unique = arr.filter(function(item, index, inputArray) {
		return inputArray.indexOf(item) == index;
	});
	return unique;
}

  useEffect(() => {
    (async () => {
      const entries = await Promise.all(filteredOrders.map((order) => getOrderEntries(order.id)));
      const ids = [];
      const a = [];
      ids.push(...entries.map(order => order.map(entry => entry.productId)));
      ids.forEach(e => a.push(...e))

      const products = await Promise.all(uniqueArray(a).map(e => getOrderProducts(e)));

      const output = entries.map((order) => {
        const formattedOrder = order.map((entry) => {
          const p = products.find((product) => product.id === entry.productId);
          return {
            ...entry,
            product: p,
          }
        });
        return formattedOrder;
      });

      const output2 = output.map((order, index) => {
        let totalPrice = 0;
        order.forEach((entry) => {
          totalPrice += entry.amount * entry.historicPrice;
        })

        return {
          id: index + 1,
          products: order,
          totalPrice, 
        }
      });

      setOrders(output2);
    })();
  }, []);

  const redirect = () => {
    setShowOrders(false);
  };

  return (
    <View
      orders={orders}
      redirect={redirect}
    />
  );
};

export default OrdersHistoryPage;
