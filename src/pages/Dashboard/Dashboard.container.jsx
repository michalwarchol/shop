import React from 'react';
import { useSearchParams } from 'react-router-dom';

import View from './Dashboard.view';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const items = [{
    id: '1',
    name: 'item 1',
    price: '110.12',
    src: 'https://images.pexels.com/photos/163822/color-umbrella-red-yellow-163822.jpeg',
  }, {
    id: '1',
    name: 'item 1',
    price: '110.12',
    src: 'https://images.pexels.com/photos/163822/color-umbrella-red-yellow-163822.jpeg',
  }, {
    id: '1',
    name: 'item 1',
    price: '110.12',
    src: 'https://images.pexels.com/photos/163822/color-umbrella-red-yellow-163822.jpeg',
  }, {
    id: '1',
    name: 'item 1',
    price: '110.12',
    src: 'https://images.pexels.com/photos/163822/color-umbrella-red-yellow-163822.jpeg',
  }, {
    id: '1',
    name: 'item 1',
    price: '110.12',
    src: 'https://images.pexels.com/photos/163822/color-umbrella-red-yellow-163822.jpeg',
  }, {
    id: '1',
    name: 'item 1',
    price: '110.12',
    src: 'https://images.pexels.com/photos/163822/color-umbrella-red-yellow-163822.jpeg',
  }, ]
  return (
    <View
      items={items}
      page={parseInt(params.page) || 1}
      total={50}
    />
  );
};

export default DashboardPage;
