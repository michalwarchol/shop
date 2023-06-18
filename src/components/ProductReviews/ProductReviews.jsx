import React from "react";
import { initialValues } from "./ProductReviews.consts";
import Button from "components/Button/Button";
import styles from "./ProductReviews.styles.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "components/TextArea/TextArea";

const ProductReviews = ({ id, opinions, sendOpinion }) => {
  if (!id) return <div>Wybierz produkt</div>;

  const renderedReviews = opinions.map(({ id, description, user }) => (
    <div
      className={styles.review}
      key={id}
    >
      <div className={styles.reviewInfo}>
        <p className={styles.reviewAuthor}>{user.firstName}</p>
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
          onSubmit={(values, bag) => {
            sendOpinion(values);
            bag.resetForm();
          }}
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
                type="submit"
              >
                DODAJ
              </Button>
            </Form>
          )}
        </Formik>
        <div className={styles.reviews}>{renderedReviews}</div>
      </div>
    </div>
  );
};

export default ProductReviews;
