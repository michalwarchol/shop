import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import config from 'src/config';

import View from './Dashboard.view';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${config.apiUrl}/products?limit=20&page=1`)
      .then(response => response.json())
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err));
  }, [searchParams]);

  return (
    <View
      items={items}
      page={parseInt(params.page) || 1}
      total={50}
    />
  );
};

export default DashboardPage;
