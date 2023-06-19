import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import config from 'src/config';

import View from './Dashboard.view';
import { formatItems, formatParams } from './Dashboard.utils';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const page = `page=${params.page || 1}`;
    fetch(`${config.apiUrl}/products?${formatParams(params)}limit=12&${page}`)
      .then(response => response.json())
      .then(res => {
        setItems(formatItems(res.result.data));
        setTotal(res.result.totalObjects);
      }).catch(err => console.log(err));
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View
      items={items}
      page={parseInt(params.page) || 1}
      total={total}
    />
  );
};

export default DashboardPage;
