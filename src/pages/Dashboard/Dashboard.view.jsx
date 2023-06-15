import React from "react";

import FilterBar from "components/FilterBar/FilterBar";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import ItemNode from 'components/ItemNode';
import Pagination from 'components/Pagination';

import styles from './Dashboard.styles.scss';

const DashboardView = ({ items, page = 1, perPage = 12, total = 1 }) => (
  <div>
    <Header />
    <FilterBar />
    <div className={styles.itemsWrapper}>
      {items.map((item, index) => (
        <ItemNode item={item} key={index} />
      ))}
    </div>
    <Pagination page={page} perPage={perPage} total={total} />
    <Footer />
  </div>
);

export default DashboardView;
