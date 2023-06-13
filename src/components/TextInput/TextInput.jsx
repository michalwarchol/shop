import React from 'react';
import cls from 'classnames';

import styles from './TextInput.styles.scss';

const TextInput = ({ name, value, handleChange, type, error, touched, placeholder }) => (
  <div className={styles.textInput}>
    <input
      name={name}
      value={value}
      type={type || 'text'}
      onChange={handleChange}
      placeholder={placeholder}
      className={cls(styles.input, {
        [styles.inputError]: touched && error,
      })}
    />
    {(touched && error) && (
      <div className={styles.errorWrapper}>
        {error}
      </div>
    )}
  </div>
);

export default TextInput;
