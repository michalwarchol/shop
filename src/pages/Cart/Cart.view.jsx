import React from "react";

import styles from "./Cart.styles.scss";
import Header from "components/Header/Header";
import FilterBar from "components/FilterBar/FilterBar";
import Footer from "components/Footer/Footer";
import Cart from "components/Cart/Cart";

const CartView = () => {
  return (
    <div>
      <Header />
      <FilterBar />
      <Cart />
      <Footer />
    </div>
  );
};

export default CartView;
