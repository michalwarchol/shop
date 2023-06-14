import React, { useState } from "react";
import { initialValues } from "./ProductReviews.consts";
import Button from "components/Button/Button";
import styles from "./ProductReviews.styles.scss";

const ProductReviews = ({ id }) => {
  const [newReview, setNewReview] = useState("");

  if (!id) return <div>Wybierz produkt</div>;

  const reviews = initialValues;

  const addReview = () => {
    // TODO
  };

  const getReviewAuthor = (id) => {
    // TODO

    return "Pan Maciej";
  };

  const loadMore = () => {
    // TODO
  };

  const renderedReviews = reviews.map(({ id, description, user_id }) => (
    <div
      className={styles.review}
      key={id}
    >
      <div className={styles.reviewInfo}>
        <p className={styles.reviewAuthor}>{getReviewAuthor(user_id)}</p>
        <p className={styles.reviewDate}>21.04.2023</p>
      </div>
      <div className={styles.reviewText}>{description}</div>
    </div>
  ));

  return (
    <div className={styles.productReviews}>
      <div className={styles.productReviewsInner}>
        <p className={styles.reviewsHeader}>Opinie:</p>
        <textarea
          className={styles.addReviewInput}
          placeholder="napisz opinię..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <Button
          className={styles.addReviewButton}
          onClick={addReview}
        >
          DODAJ
        </Button>
        <div className={styles.reviews}>{renderedReviews}</div>
        <Button
          className={styles.loadMoreButton}
          onClick={loadMore}
        >
          DOCZYTAJ WIĘCEJ
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
