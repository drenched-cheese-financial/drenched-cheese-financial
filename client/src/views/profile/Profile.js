import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ValidationForm from '../../components/validation/ValidationForm';

function Profile() {
  const [customer, setCustomer] = useState();
  const [loginJSX, setLoginJSX] = useState();
  const [customerJSX, setCustomerJSX] = useState();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const fetchCustomer = () => {
    axios
      .get('http://localhost:3001/customer', {
        withCredentials: true,
      })
      .then((res) => {
        setIsPageLoaded(true);
        if (res.data) {
          setCustomer(res.data);
        }
      });
  };

  const renderLoginJSX = () => {
    if (isPageLoaded && !customer) {
      setLoginJSX(<ValidationForm isFromRedirect={true} onValidate={fetchCustomer} />);
    } else {
      setLoginJSX();
    }
  };

  const renderCustomerJSX = () => {
    if (customer) {
      setCustomerJSX(
        <div>
          <h1>Customer Profile</h1>
          <table border='1'>
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{customer.firstName}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{customer.lastName}</td>
              </tr>
              <tr>
                <th>Id</th>
                <td>{customer.customerId}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{customer.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{customer.phonenum}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{customer.address}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{customer.city}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{customer.state}</td>
              </tr>
              <tr>
                <th>Postal Code</th>
                <td>{customer.postalCode}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{customer.country}</td>
              </tr>
              <tr>
                <th>User id</th>
                <td>{customer.userid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      setCustomerJSX();
    }
  };

  useEffect(fetchCustomer, []);
  useEffect(renderLoginJSX, [customer, isPageLoaded]);
  useEffect(renderCustomerJSX, [customer]);

  return (
    <div>
      {loginJSX}
      {customerJSX}
    </div>
  );
}

export default Profile;
