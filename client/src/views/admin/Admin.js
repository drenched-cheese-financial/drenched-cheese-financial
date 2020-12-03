import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SalesTable from './SalesTable';

function Admin() {
  const history = useHistory();
  const [adminInfo, setAdminInfo] = useState();
  const [tableJSX, setTableJSX] = useState();

  const fetchAdminInfo = () => {
    axios.get('https://the-drenched-cheese-financial.herokuapp.com/admin', { withCredentials: true }).then((res) => {
      if (res.data) {
        setAdminInfo(res.data);
      } else {
        history.push('/login');
      }
    });
  };

  const renderSalesTable = () => {
    if (!adminInfo) {
      setTableJSX(<p>Failed to load table data.</p>);
    } else if (adminInfo.err) {
      setTableJSX(<p>{adminInfo.err}</p>);
    } else {
      setTableJSX(<SalesTable sales={adminInfo.sales} />);
    }
  };

  useEffect(fetchAdminInfo, [history]);
  useEffect(renderSalesTable, [adminInfo]);

  return (
    <div>
      <h1>Administrator Sales Report by Day</h1>
      {tableJSX}
    </div>
  );
}

export default Admin;
