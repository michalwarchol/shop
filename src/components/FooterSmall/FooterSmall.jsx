import React from 'react';

import styles from './FooterSmall.styles.scss';

const FooterSmall = () => (
  <div className={styles.footerSmall}>
    Alkohole24 {new Date().getFullYear()}. Wszystkie prawa zastrzeżone
  </div>
);

export default FooterSmall;
