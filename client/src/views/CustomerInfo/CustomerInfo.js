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
    return (
      <div>
        <h3>Customer Profile</h3>
        <table border="1">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{customerInfo.customerId}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{customerInfo.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{customerInfo.lastName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{customerInfo.email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{customerInfo.phonenum}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{customerInfo.address}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{customerInfo.city}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{customerInfo.state}</td>
            </tr>
            <tr>
              <th>Postal Code</th>
              <td>{customerInfo.postalCode}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{customerInfo.country}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{customerInfo.userid}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return 'Customer info loading... Please wait.';
  }
}

export default CustomerInfo;
