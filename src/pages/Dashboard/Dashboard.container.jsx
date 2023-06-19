import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import config from "src/config";

import View from "./Dashboard.view";
import { formatItems, formatParams } from "./Dashboard.utils";
import axios from "axios";

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${config.apiUrl}/products?${formatParams(params)}limit=12&${page}`);

        setItems(formatItems(res.data.result.data));
        setTotal(res.data.result.totalObjects);
      } catch (error) {
        console.error(error);
      }
    })();
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
