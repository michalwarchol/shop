import React, { useEffect, useState } from "react";
import { initialValues } from "./ProductReviews.consts";
import Button from "components/Button/Button";
import styles from "./ProductReviews.styles.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "components/TextArea/TextArea";

const ProductReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    (async () => {
      // TODO - fetch reviews
      setReviews([
        {
          id: "2",
          product_id: "2",
          user_id: "3",
          description:
            "Opis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare ornare ultricies. Aliquam enim sapien, rhoncus quis tortor sit amet, dictum gravida urna. Curabitur consequat libero vitae mauris ornare, et ornare neque tempor. Vivamus urna lectus, lobortis eu leo vel, vulputate egestas lorem. Nulla et lobortis mauris. Cras in finibus risus. Vivamus non vehicula metus, lobortis vestibulum velit. Fusce laoreet aliquam neque a blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi urna ipsum, lobortis vitae odio ut, laoreet suscipit leo.",
          rate: 4,
        },
        {
          id: "3",
          product_id: "2",
          user_id: "2",
          description:
            "Opis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare ornare ultricies. Aliquam enim sapien, rhoncus quis tortor sit amet, dictum gravida urna. Curabitur consequat libero vitae mauris ornare, et ornare neque tempor. Vivamus urna lectus, lobortis eu leo vel, vulputate egestas lorem. Nulla et lobortis mauris. Cras in finibus risus. Vivamus non vehicula metus, lobortis vestibulum velit. Fusce laoreet aliquam neque a blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi urna ipsum, lobortis vitae odio ut, laoreet suscipit leo.",
          rate: 5,
        },
      ]);
    })();
  }, []);

  if (!id) return <div>Wybierz produkt</div>;

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

  const onSubmit = (values) => {
    // TODO
    console.log(values);
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
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={Yup.object({
            review: Yup.string().required("Pole jest wymagane"),
          })}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form className={styles.formContainer}>
              <TextArea
                name="review"
                placeholder="napisz opinię..."
                value={values.review}
                handleChange={handleChange("review")}
                error={errors.review}
                touched={touched.review}
                className={styles.addReviewInput}
              />
              <Button
                className={styles.addReviewButton}
                onClick={addReview}
                type="submit"
              >
                DODAJ
              </Button>
            </Form>
          )}
        </Formik>
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
