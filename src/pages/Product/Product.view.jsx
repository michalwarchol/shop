import React from "react";

import Header from "components/Header/Header";
import { useQuery } from "src/hooks/useQuery";
import ProductInfo from "components/ProductInfo/ProductInfo";
import FilterBar from "components/FilterBar/FilterBar";
import ProductReviews from "components/ProductReviews/ProductReviews";
import styles from "./Product.styles.scss";

const ProductView = () => {
  const query = useQuery();
  const id = query.get("id");

  return (
    <div className={styles.product}>
      <Header />
      <FilterBar />
      <ProductInfo id={id} />
      <ProductReviews id={id} />
    </div>
  );
};

export default ProductView;
