import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerInfo() {
  // TODO: get this from auth
  // TODO: add routing to login if this is null
  const customerId = '1';

  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    // Fetch the data on load
    axios
      .get('http://localhost:3001/customer?custId=' + customerId)
      .then((response) => {
        setCustomerInfo(response.data.recordset[0]);
      });
  }, []);

  if (customerInfo) {
    const listItems = Object.entries(customerInfo)
      .slice(0, -1)
      .map((row) => (
        <tr key={row[0]}>
          <th>{row[0]}</th>
          <td>{row[1]}</td>
        </tr>
      ));
    return (
      <div>
        <h3>Customer Profile</h3>
        <table border="1">
          <tbody>{listItems}</tbody>
        </table>
      </div>
    );
  } else {
    return 'Customer info loading... Please wait.';
  }
}

export default CustomerInfo;
