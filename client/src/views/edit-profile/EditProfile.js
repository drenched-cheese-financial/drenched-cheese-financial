import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ValidationForm from '../../components/validation/ValidationForm';
import './editProfile.scss';

function EditProfile() {
  const history = useHistory();
  const [customer, setCustomer] = useState();
  const [loginJSX, setLoginJSX] = useState();
  const [formJSX, setFormJSX] = useState();
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

  const handleChange = (event) => {
    setCustomer((customer) => ({ ...customer, [event.target.name]: event.target.value }));
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

  const renderFormJSX = () => {
    if (customer) {
      setFormJSX(
        <form className='customer'>
          <div className='split'>
            <h1>Edit your profile information</h1>
            <h3>
              ID: <span className='highlight'>{customer.id}</span>
            </h3>
          </div>
          <hr />
          <h2>Contact Information</h2>
          <p>
            <label>Username: </label>
            <input type='text' name='username' value={customer.username} onChange={handleChange} />
          </p>
          <p>
            <label>First Name: </label>
            <input type='text' name='firstName' value={customer.firstName} onChange={handleChange} />
          </p>
          <p>
            <label>Last Name: </label>
            <input type='text' name='lastName' value={customer.lastName} onChange={handleChange} />
          </p>
          <p>
            <label>Email: </label>
            <input type='email' name='email' value={customer.email} onChange={handleChange} />
          </p>
          <p>
            <label>Phone: </label>
            <input type='tel' name='phone' value={customer.phone} onChange={handleChange} />
          </p>
          <h2>Address Information</h2>
          <p>
            <label>Country: </label>
            <input type='text' name='country' value={customer.country} onChange={handleChange} />
          </p>
          <p>
            <label>State: </label>
            <input type='text' name='state' value={customer.state} onChange={handleChange} />
          </p>
          <p>
            <label>City: </label>
            <input type='text' name='city' value={customer.city} onChange={handleChange} />
          </p>
          <p>
            <label>Address: </label>
            <input type='text' name='address' value={customer.address} onChange={handleChange} />
          </p>
          <p>
            <label>Postal Code: </label>
            <input type='text' name='postalCode' value={customer.postalCode} onChange={handleChange} />
          </p>
          <div className='center'>
            <input type='submit' value='Save' />
          </div>
        </form>
      );
    } else {
      setFormJSX();
    }
  };

  useEffect(fetchCustomer, []);
  useEffect(renderLoginJSX, [customer, isPageLoaded, history]);
  useEffect(renderFormJSX, [customer]);

  return (
    <div className='profile'>
      {loginJSX}
      {formJSX}
    </div>
  );
}

export default EditProfile;
