import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CustomersTable from './CustomersTable';

function Customers() {
  const history = useHistory();
  const [customers, setCustomers] = useState();
  const [customersJSX, setCustomersJSX] = useState();

  const fetchCustomers = () => {
    axios.get('https://the-drenched-cheese-financial.herokuapp.com/customers', { withCredentials: true }).then((res) => {
      setCustomers(res.data);
    });
  };

  const renderCustomersJSX = () => {
    if (!customers) {
      setCustomersJSX(<p>Failed to load table data.</p>);
    } else if (customers.err) {
      setCustomersJSX(<p>{customers.err}</p>);
    } else {
      setCustomersJSX(<CustomersTable customers={customers} />);
    }
  };

  useEffect(fetchCustomers, [history]);
  useEffect(renderCustomersJSX, [customers]);

  return (
    <div>
      <h1>All Customers</h1>
      {customersJSX}
    </div>
  );
}

export default Customers;
