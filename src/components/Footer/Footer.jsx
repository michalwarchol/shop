import React, { useContext } from "react";
import { Link } from "react-router-dom";

import FooterSmall from "components/FooterSmall/FooterSmall";
import { DataContext } from "providers/DataProvider/DataProvider";

import styles from "./Footer.styles.scss";
import { formatCategories } from './Footer.utils';

const Footer = () => {
  const { categories } = useContext(DataContext);
  const columns = formatCategories(categories);

  return (
    <div className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.logo}>Alkohole24</div>
        <div className={styles.products}>
          {columns.map((column, index) => (
            <div className={styles.productColumn} key={index}>
              {column.map((category) => (
                <Link to={`/?category_id=${category.id}`} key={category.id}>{category.name}</Link>
              ))}
            </div>
          ))}
        </div>
        <FooterSmall className={styles.legal} />
      </div>
    </div>
  );
};

export default Footer;
