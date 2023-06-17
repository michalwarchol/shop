import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import config from 'src/config';

const DataContext = createContext({
  categories: [],
  orders: [],
});

const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

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
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    getCategories();
    // getOrders();
  }, []);

  return (
    <DataContext.Provider value={{ categories, orders, setOrders }}>
      <Outlet />
    </DataContext.Provider>
  );
};

export default DataProvider;
export { DataContext };
