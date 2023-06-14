import React from "react";

import Header from "components/Header/Header";
import { useQuery } from "src/hooks/useQuery";
import ProductInfo from "components/ProductInfo/ProductInfo";
import FilterBar from "components/FilterBar/FilterBar";
import ProductReviews from "components/ProductReviews/ProductReviews";

const ProductView = () => {
  const query = useQuery();
  const id = query.get("id");

  return (
    <div>
      <Header />
      <FilterBar />
      <ProductInfo id={id} />
      <ProductReviews id={id} />
    </div>
  );
};

export default ProductView;
