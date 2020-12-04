import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ValidationForm from '../../components/validation/ValidationForm';
import ListOrder from '../list-order/ListOrder';

function Orders() {
  const history = useHistory();
  const [customer, setCustomer] = useState();
  const [loginJSX, setLoginJSX] = useState();
  const [ordersJSX, setOrdersJSX] = useState();
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
      history.push('/orders');
      fetchCustomer();
    };

    if (isPageLoaded && !customer) {
      setLoginJSX(
        <ValidationForm isFromRedirect={true} onValidate={handleValidate} />
      );
    } else {
      setLoginJSX();
    }
  };

  const renderOrdersJSX = () => {
    if (customer) {
      setOrdersJSX(<ListOrder customerId={customer.id} />);
    } else {
      setOrdersJSX();
    }
  };

  useEffect(fetchCustomer, []);
  useEffect(renderLoginJSX, [customer, isPageLoaded, history]);
  useEffect(renderOrdersJSX, [customer]);

  return (
    <div className='profile'>
      {loginJSX}
      {ordersJSX}
    </div>
  );
}

export default Orders;
