import React from 'react';
import cls from 'classnames';

import styles from './Button.styles.scss';

const Button = ({ children, type, className }) => (
  <button type={type} className={cls(styles.button, className)}>
    {children}
  </button>
);

export default Button;
