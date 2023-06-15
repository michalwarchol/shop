import React from "react";

import styles from "./FooterSmall.styles.scss";
import cls from "classnames";

const FooterSmall = ({ className }) => (
  <div className={cls(styles.footerSmall, className)}>Alkohole24 {new Date().getFullYear()}. Wszystkie prawa zastrzeżone</div>
);

export default FooterSmall;
