import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import config from 'src/config';

import View from "./Product.view";
import { DataContext } from "providers/DataProvider/DataProvider";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { bucketId, getBucket } = useContext(DataContext);
  const params = Object.fromEntries([...searchParams]);
  const [product, setProduct] = useState(null);
  const [country, setCountry] = useState({ name: '' });
  const [opinions, setOpinions] = useState([]);

  const sendOpinion = (values) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    fetch(`${config.apiUrl}/products_opinions`,{
      method: 'POST',
      body: JSON.stringify({
        rate: 5,
        description: values.review,
        product_id: params.id,
        user_id: userId,
      })
    })
    .then((response) => response.json())
    .then(async () => {
      const newOpinions = await getOpinions();
      setOpinions(newOpinions.data);
    }).catch(err => console.log(err));
  }

  const addToCart = (amount, price) => {
    fetch(`${config.apiUrl}/order_entries/${bucketId}`, {
      method: 'POST',
      body: JSON.stringify({
        order_id: bucketId,
        amount: amount,
        product_id: params.id,
        historic_price: price,
      })
    })
    .then(() => {
      getBucket(bucketId);
      navigate('/');
    }).catch(err => console.log(err));
  };

  const buyNow = (amount) => {
    navigate(`/cart?buynow=1&product=${params.id}&amount=${amount}`);
  }

  const getOpinions = async () => {
    const response = await fetch(`${config.apiUrl}/products_opinions/${params.id}`)
    const res = await response.json();

    return res;
  }

  const getCountry = async (id) => {
    const response = await fetch(`${config.apiUrl}/country_origin/${id}`)
    const res = await response.json();

    return res;
  }

  useEffect(() => {
    fetch(`${config.apiUrl}/products/${params.id}`)
      .then(response => response.json())
      .then(async res => {
        if(!res.product) {
          navigate('/');
          return;
        }

        const data = await Promise.all([
          getCountry(res.product.countryOriginId),
          getOpinions(),
        ]);

        setProduct(res.product);
        setCountry(data[0].country_origin);
        setOpinions(data[1].data);
      }).catch(err => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return product ?
    <View
      product={product}
      country={country}
      opinions={opinions}
      sendOpinion={sendOpinion}
      buyNow={buyNow}
      addToCart={addToCart}
    /> : null;
};

export default ProductPage;
