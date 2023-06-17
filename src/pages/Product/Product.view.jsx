import React from "react";

import Header from "components/Header/Header";
import { useQuery } from "src/hooks/useQuery";
import ProductInfo from "components/ProductInfo/ProductInfo";
import FilterBar from "components/FilterBar/FilterBar";
import ProductReviews from "components/ProductReviews/ProductReviews";
import Footer from "components/Footer/Footer";
import styles from "./Product.styles.scss";

const ProductView = ({ product, country, opinions, sendOpinion }) => {
  const query = useQuery();
  const id = query.get("id");

  return (
    <div className={styles.product}>
      <Header />
      <FilterBar />
      <ProductInfo id={id} product={product} country={country} />
      <ProductReviews id={id} opinions={opinions} sendOpinion={sendOpinion} />
      <Footer />
    </div>
  );
};

export default ProductView;
