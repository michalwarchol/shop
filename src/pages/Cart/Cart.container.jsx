import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import config from 'src/config';
import { UserContext } from "providers/UserProvider";
import { DataContext } from "providers/DataProvider/DataProvider";

import View from "./Cart.view";

const CartPage = () => {
  const { user } = useContext(UserContext);
  const { bucket, bucketId, getOrders } = useContext(DataContext);
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const getBucketProduct = async (id, amount, entryId) => {
    const response = await fetch(`${config.apiUrl}/products/${id}`);
    const res = await response.json();
    if(!res) {
      return null;
    }
    
    return {...res.product, amount, entryId };
  }

  useEffect(() => {
    if(params.buynow) {
      fetch(`${config.apiUrl}/products/${params.product}`)
      .then(response => response.json())
      .then(async res => {
        if(!res.product) {
          navigate('/');
          return;
        }

        setProduct(res.product);
      }).catch(err => console.log(err));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(!params.buynow) {
      Promise.all(bucket.map((item) => getBucketProduct(item.productId, item.amount, item.id))).then((res) => {
        setCartProducts(res);
      });
    }
  }, [bucket]); // eslint-disable-line react-hooks/exhaustive-deps


  const makeOrderEntry = (id, item) => {
    fetch(`${config.apiUrl}/order_entries/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          order_id: id,
          amount: item.amount,
          product_id: item.id,
          historic_price: item.price,
        }),
      }).catch(err => console.log(err));
  }

  const updateOrderEntry = (index, increase) => {
    const entry = bucket[index];
    const availableAmount = cartProducts[index].availableAmount;

    if(increase && availableAmount === entry.amount) {
      return;
    }

    if(!increase && entry.amount === 1) {
      return;
    }

    fetch(`${config.apiUrl}/order_entries/${entry.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        order_id: entry.orderId,
        amount: increase ? entry.amount + 1 : entry.amount - 1,
        product_id: entry.productId,
        historic_price: entry.historicPrice,
      }),
    }).then(() => getOrders())
    .catch(err => console.log(err));
  }

  const buy = (item) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" +  date.getMinutes() + ":" + date.getSeconds();


    if(!item) {
      fetch(`${config.apiUrl}/orders/${bucketId}`, {
        method: 'PUT',
        body: JSON.stringify({
          user_id: user.id,
          order_date: formattedDate,
          state_id: 3,
        }),
      }).then(() => {
        getOrders();
        navigate('/');
      }).catch(err => console.log(err));
    }
    
    if(params.buynow) {
      fetch(`${config.apiUrl}/orders`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,
          order_date: formattedDate,
          state_id: 3,
        }),
      })
      .then(response => response.json())
      .then(async res => {
        makeOrderEntry(res.order_id, item);

      }).catch(err => console.log(err));
    }
  }

  const removeOrderEntry = (id) => {
    fetch(`${config.apiUrl}/order_entries/${id}`, {
        method: 'DELETE',
      }).then(() => {
        getOrders();
      }).catch(err => console.log(err));
  }

  return params.buynow && product
    ? <View products={[]} product={product} buy={buy} removeOrderEntry={() => {}} updateOrderEntry={updateOrderEntry} />
    : <View products={cartProducts} product={null} buy={buy} removeOrderEntry={removeOrderEntry} updateOrderEntry={updateOrderEntry} />;
};

export default CartPage;
