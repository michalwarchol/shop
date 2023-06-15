import React from "react";
import cls from "classnames";
import styles from "./TextArea.styles.scss";

const TextArea = ({ className, name, value, handleChange, touched, error, placeholder }) => {
  return (
    <div className={cls(styles.wrapper, className, { [styles.error]: touched && error })}>
      <textarea
        className={styles.textArea}
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
      ></textarea>
      {error && touched ? <div className={styles.errorMessage}>{error}</div> : null}
    </div>
  );
};

export default TextArea;
