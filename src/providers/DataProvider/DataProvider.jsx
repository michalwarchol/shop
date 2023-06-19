import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import config from 'src/config';

const DataContext = createContext({
  categories: [],
  orders: [],
  bucket: [],
  bucketId: null,
  getBucket: () => {},
  setOrders: () => {},
  getOrders: () => {},
});

const DataProvider = () => {
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bucket, setBucket] = useState([]);
  const [bucketId, setBucketId] = useState(null);

  const getCategories = () => {
    fetch(`${config.apiUrl}/categories`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {
      setCategories(res.result);
    }).catch(error => console.log(error));
  }

  const getBucket = (orderId) => {
    fetch(`${config.apiUrl}/order_entries/${orderId}`)
    .then(response => response.json())
    .then(res => {
      setBucket(res.data);
      setBucketId(orderId);
    }).catch(error => console.log(error));
  }

  const createNewBucket = () => {
    const userId = localStorage.getItem('userId');
    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" +  date.getMinutes() + ":" + date.getSeconds();

    fetch(`${config.apiUrl}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        order_date: formattedDate,
        state_id: 0,
      }),
    })
    .then(response => response.json())
    .then(res => {
      getBucket(res.order_id);
    }).catch(error => console.log(error));
  }

  const getOrders = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setOrders([]);
      return;
    }
    fetch(`${config.apiUrl}/orders/${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {
      setOrders(res.data);

      const bucket = res.data.find((order) => order.stateId === '0');
      if (!bucket) {
        createNewBucket();
      } else {
        getBucket(bucket.id);
      }
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    getCategories();
    getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DataContext.Provider value={{ categories, orders, bucket, bucketId, getOrders, getBucket, setOrders }}>
      <Outlet />
    </DataContext.Provider>
  );
};

export default DataProvider;
export { DataContext };
