import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SalesTable from './SalesTable';

function SalesPage() {
  const history = useHistory();
  const [salesInfo, setSalesInfo] = useState();
  const [salesJSX, setSalesJSX] = useState();

  const fetchSalesInfo = () => {
    axios.get('http://localhost:3001/sales', { withCredentials: true }).then((res) => {
      setSalesInfo(res.data);
    });
  };

  const renderPageJSX = () => {
    if (!salesInfo) {
      setSalesJSX(<p>Failed to load table data.</p>);
    } else if (salesInfo.err) {
      setSalesJSX(<p>{salesInfo.err}</p>);
    } else {
      setSalesJSX(<SalesTable sales={salesInfo.sales} />);
    }
  };

  useEffect(fetchSalesInfo, [history]);
  useEffect(renderPageJSX, [salesInfo]);

  return (
    <div>
      <h1>Daily Sales Report</h1>
      {salesJSX}
    </div>
  );
}

export default SalesPage;
