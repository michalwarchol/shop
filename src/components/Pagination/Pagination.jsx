import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cls from 'classnames';

import Button from 'components/Button';

import styles from './Pagination.styles.scss';

const Pagination = ({ perPage, page, total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const showFirst = page > 2;
  const showLast = total / perPage > 4 && page !== Math.ceil(total / perPage) && page + 1 !== Math.ceil(total / perPage);

  return (
    <div className={styles.pagination}>
      <div className={styles.marginButtonWrapper}>
        {showFirst && (
          <Button
            className={cls(styles.marginRight, styles.paginationButton)}
            onClick={()=> setSearchParams({ ...params, page: 1 })}
          >
            1
          </Button>
        )}
      </div>
      {page > 1 && (
        <Button
          className={styles.paginationButton}
          onClick={()=> setSearchParams({ ...params, page: page - 1 })}
        >
          {page - 1}
        </Button>
      )}
      <Button
        className={styles.activePaginationButton}
        onClick={()=> setSearchParams({ ...params, page })}
      >
        {page}
      </Button>
      {page * perPage < total &&  (
        <Button
          className={styles.paginationButton}
          onClick={()=> setSearchParams({ ...params, page: page + 1 })}
        >
          {page + 1}
        </Button>
      )}
      <div className={styles.marginButtonWrapper}>
        {showLast && (
          <Button
            className={cls(styles.marginLeft, styles.paginationButton)}
            onClick={()=> setSearchParams({ ...params, page: Math.ceil(total / perPage) })}
          >
            {Math.ceil(total / perPage)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
