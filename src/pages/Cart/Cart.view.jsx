import React from "react";

import Header from "components/Header/Header";
import FilterBar from "components/FilterBar/FilterBar";
import Footer from "components/Footer/Footer";
import Cart from "components/Cart/Cart";

const CartView = ({ product, buy, products, removeOrderEntry, updateOrderEntry }) => {
  return (
    <div>
      <Header />
      <FilterBar />
      <Cart products={products} product={product} buy={buy} removeOrderEntry={removeOrderEntry} updateOrderEntry={updateOrderEntry} />
      <Footer />
    </div>
  );
};

export default CartView;
