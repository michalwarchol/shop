import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import config from "src/config";
import { UserContext } from "providers/UserProvider";
import { DataContext } from "providers/DataProvider/DataProvider";

import View from "./Cart.view";
import axios from "axios";

const CartPage = () => {
  const { user } = useContext(UserContext);
  const { bucket, bucketId, getOrders } = useContext(DataContext);
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const getBucketProduct = async (id, amount, entryId) => {
    try {
      const res = await axios.get(`${config.apiUrl}/products/${id}`);

      if (!res.data) {
        throw Error("No data");
      }

      return { ...res.product, amount, entryId };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      if (params.buynow) {
        try {
          const res = await axios.get(`${config.apiUrl}/products/${params.product}`);
          if (!res.data.product) {
            navigate("/");
            return;
          }

          setProduct(res.data.product);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!params.buynow) {
      Promise.all(bucket.map((item) => getBucketProduct(item.productId, item.amount, item.id))).then((res) => {
        setCartProducts(res);
      });
    }
  }, [bucket]); // eslint-disable-line react-hooks/exhaustive-deps

  const makeOrderEntry = async (id, item) => {
    try {
      await axios.post(`${config.apiUrl}/order_entries/${id}`, {
        order_id: id,
        amount: item.amount,
        product_id: item.id,
        historic_price: item.price,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderEntry = async (index, increase) => {
    const entry = bucket[index];
    const availableAmount = cartProducts[index].availableAmount;

    if (increase && availableAmount === entry.amount) {
      return;
    }

    if (!increase && entry.amount === 1) {
      return;
    }

    try {
      await axios.put(`${config.apiUrl}/order_entries/${entry.id}`, {
        order_id: entry.orderId,
        amount: increase ? entry.amount + 1 : entry.amount - 1,
        product_id: entry.productId,
        historic_price: entry.historicPrice,
      });

      getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const buy = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
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

    if (!item) {
      try {
        await axios.put(`${config.apiUrl}/orders/${bucketId}`, {
          user_id: user.id,
          order_date: formattedDate,
          state_id: 3,
        });

        getOrders();
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }

    if (params.buynow) {
      try {
        const res = await axios.post(`${config.apiUrl}/orders`, {
          user_id: user.id,
          order_date: formattedDate,
          state_id: 3,
        });

        makeOrderEntry(res.data.order_id, item);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeOrderEntry = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/order_entries/${id}`);

      getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return params.buynow && product ? (
    <View
      products={[]}
      product={product}
      buy={buy}
      removeOrderEntry={() => {}}
      updateOrderEntry={updateOrderEntry}
    />
  ) : (
    <View
      products={cartProducts}
      product={null}
      buy={buy}
      removeOrderEntry={removeOrderEntry}
      updateOrderEntry={updateOrderEntry}
    />
  );
};

export default CartPage;
