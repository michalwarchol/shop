import React, { useState } from "react";
import { initialValues } from "./ProductInfo.consts";
import Button from "components/Button/Button";
import styles from "./ProductInfo.styles.scss";

const ProductInfo = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const { name, src, category_id, price, alcohol_content, rating, description, country_origin_id, available_amount } = initialValues;

  const getOriginCountry = () => {
    // TODO

    return "Niemcy";
  };

  const incrementOrderQuantity = () => {
    if (quantity < available_amount) {
      setQuantity((currentQuantity) => (currentQuantity += 1));
    }
  };

  const decrementOrderQuantity = () => {
    if (quantity > 1) {
      setQuantity((currentQuantity) => (currentQuantity -= 1));
    }
  };

  const addToBasket = () => {
    // TODO
  };

  const buyNow = () => {
    // TODO
  };

  if (!id) return <div>Wybierz produkt</div>;

  return (
    <div className={styles.productInfo}>
      <div className={styles.productInfoInner}>
        <div className={styles.imgContainer}>
          <img
            src={src}
            alt={name}
          />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>{price} zł</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.origin}>Kraj pochodzenia: {getOriginCountry()}</p>
          <div className={styles.orderQuantityWrapper}>
            <p>Ilość sztuk:</p>
            <Button
              className={styles.orderQuantityButton}
              onClick={decrementOrderQuantity}
            >
              -
            </Button>
            <div className={styles.orderQuantity}>{quantity}</div>
            <Button
              className={styles.orderQuantityButton}
              onClick={incrementOrderQuantity}
            >
              +
            </Button>
          </div>
          <div className={styles.orderBar}>
            <Button
              className={styles.addToBasket}
              onClick={addToBasket}
            >
              DODAJ DO KOSZYKA
            </Button>
            <Button
              className={styles.buyNow}
              onClick={buyNow}
            >
              KUP TERAZ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
