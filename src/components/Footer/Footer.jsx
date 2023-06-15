import React from "react";

import styles from "./Footer.styles.scss";
import { Link } from "react-router-dom";
import FooterSmall from "components/FooterSmall/FooterSmall";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.logo}>Alkohole24</div>
        <div className={styles.products}>
          <div className={styles.productColumn}>
            <Link to="/vodka">wódka</Link>
            <Link to="/wine">wina</Link>
            <Link to="/beer">piwa</Link>
            <Link to="/champagne">szampany</Link>
          </div>
          <div className={styles.productColumn}>
            <Link to="/liquor">likiery</Link>
            <Link to="/whisky">whisky</Link>
            <Link to="/gin">gin</Link>
            <Link to="/rum">rum</Link>
          </div>
          <div className={styles.productColumn}>
            <Link to="/cognac">koniak</Link>
            <Link to="/absinth">absynt</Link>
            <Link to="/cider">cydr</Link>
            <Link to="/mead">miód pitny</Link>
          </div>
        </div>
        <FooterSmall className={styles.legal} />
      </div>
    </div>
  );
};

export default Footer;
