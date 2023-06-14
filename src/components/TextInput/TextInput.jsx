import React from 'react';
import cls from 'classnames';

import styles from './TextInput.styles.scss';

const TextInput = ({ name, value, handleChange, type, error, touched, placeholder, className }) => (
  <div className={cls(styles.textInput, className)}>
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
