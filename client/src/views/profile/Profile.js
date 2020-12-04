import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ValidationForm from '../../components/validation/ValidationForm';
import './profile.scss';

function Profile() {
  const history = useHistory();
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
    const handleValidate = () => {
      history.push('/profile');
      fetchCustomer();
    };

    if (isPageLoaded && !customer) {
      setLoginJSX(<ValidationForm isFromRedirect={true} onValidate={handleValidate} />);
    } else {
      setLoginJSX();
    }
  };

  const renderCustomerJSX = () => {
    const handleEditClick = () => {
      history.push('/profile/edit');
    };

    if (customer) {
      setCustomerJSX(
        <div className='customer'>
          <div className='split'>
            <h1>
              {customer.firstName} {customer.lastName}'s Profile
            </h1>
            <h3>
              ID: <span className='highlight'>{customer.id}</span>
            </h3>
          </div>
          <hr />
          <p>
            Username: <span className='highlight'>{customer.username}</span>
          </p>
          <p>
            Email: <span className='highlight'>{customer.email}</span>
          </p>
          <p>
            Phone: <span className='highlight'>{customer.phone}</span>
          </p>
          <p>
            Address:{' '}
            <span className='highlight'>
              {customer.address} - {customer.city}, {customer.state}, {customer.country} - {customer.postalCode}
            </span>
          </p>
          <br />
          <div className='center'>
            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        </div>
      );
    } else {
      setCustomerJSX();
    }
  };

  useEffect(fetchCustomer, []);
  useEffect(renderLoginJSX, [customer, isPageLoaded, history]);
  useEffect(renderCustomerJSX, [customer, history]);

  return (
    <div className='profile'>
      {loginJSX}
      {customerJSX}
    </div>
  );
}

export default Profile;
