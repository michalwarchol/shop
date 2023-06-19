import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import config from "src/config";

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

  const getCategories = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/categories`);

      setCategories(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const getBucket = async (orderId) => {
    try {
      const res = await axios.get(`${config.apiUrl}/order_entries/${orderId}`);

      setBucket(res.data.data);
      setBucketId(orderId);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewBucket = async () => {
    const userId = localStorage.getItem("userId");
    const date = new Date();
    const formattedDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    try {
      const res = await axios.post(`${config.apiUrl}/orders`, {
        user_id: userId,
        order_date: formattedDate,
        state_id: 0,
      });

      getBucket(res.data.order_id);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setOrders([]);
      return;
    }

    try {
      const res = await axios.get(`${config.apiUrl}/orders/${userId}`);

      setOrders(res.data.data);

      const bucket = res.data.data.find((order) => order.stateId === "0");
      if (!bucket) {
        createNewBucket();
      } else {
        getBucket(bucket.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
