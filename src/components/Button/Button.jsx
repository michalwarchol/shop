import React from 'react';
import cls from 'classnames';

import styles from './Button.styles.scss';

const Button = ({ children, type = 'button', className, onClick }) => (
  <button type={type} className={cls(styles.button, className)} onClick={onClick}>
    {children}
  </button>
);

export default Button;
