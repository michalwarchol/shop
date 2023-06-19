import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import config from "src/config";

import View from "./Product.view";
import { DataContext } from "providers/DataProvider/DataProvider";
import axios from "axios";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { bucketId, getBucket } = useContext(DataContext);
  const params = Object.fromEntries([...searchParams]);
  const [product, setProduct] = useState(null);
  const [country, setCountry] = useState({ name: "" });
  const [opinions, setOpinions] = useState([]);

  const sendOpinion = async (values) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(`${config.apiUrl}/products_opinions`, {
        rate: 5,
        description: values.review,
        product_id: params.id,
        user_id: userId,
      });

      const newOpinions = await getOpinions();
      setOpinions(newOpinions.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (amount, price) => {
    try {
      await axios.post(`${config.apiUrl}/order_entries/${bucketId}`, {
        order_id: bucketId,
        amount: amount,
        product_id: params.id,
        historic_price: price,
      });

      getBucket(bucketId);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const buyNow = (amount) => {
    navigate(`/cart?buynow=1&product=${params.id}&amount=${amount}`);
  };

  const getOpinions = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/products_opinions/${params.id}`);

      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getCountry = async (id) => {
    try {
      const res = await axios.get(`${config.apiUrl}/country_origin/${id}`);

      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${config.apiUrl}/products/${params.id}`);

        if (!res.data.product) {
          navigate("/");
          return;
        }

        const data = await Promise.all([getCountry(res.data.product.countryOriginId), getOpinions()]);

        setProduct(res.data.product);
        setCountry(data[0].country_origin);
        setOpinions(data[1].data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return product ? (
    <View
      product={product}
      country={country}
      opinions={opinions}
      sendOpinion={sendOpinion}
      buyNow={buyNow}
      addToCart={addToCart}
    />
  ) : null;
};

export default ProductPage;
