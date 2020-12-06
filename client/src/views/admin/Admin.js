import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ValidationForm from '../../components/validation/ValidationForm';
import SalesPage from './sales/SalesPage';
import Customers from './customers/Customers'
import ListOrder from './list-order/ListOrder';
import './admin.scss';

function Admin() {
  const history = useHistory();
  const [customer, setCustomer] = useState();
  const [loginJSX, setLoginJSX] = useState();
  const [adminBarJSX, setAdminBarJSX] = useState();
  const [pageJSX, setPageJSX] = useState();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const fetchCustomer = () => {
    axios
      .get('https://the-drenched-cheese-financial.herokuapp.com/customer', {
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
      history.push('/admin');
      fetchCustomer();
    };

    if (isPageLoaded && !customer) {
      setLoginJSX(<ValidationForm isFromRedirect={true} requireAdmin={true} onValidate={handleValidate} />);
    } else {
      setLoginJSX();
    }
  };

  const renderAdminBar = () => {
    if (isPageLoaded && customer) {
      setAdminBarJSX(
        <div className='adminBar'>
          <h2>Administrator View</h2>
          <div className='adminButtons'>
            <button onClick={renderSalesPage}>View Sales</button>
            <button onClick={renderCustomersPage}>List Customers</button>
            <button onClick={renderOrdersPage}>List Orders</button>
          </div>
        </div>
      );
      renderSalesPage();
    } else {
      setAdminBarJSX();
    }
  };

  const renderSalesPage = () => {
    setPageJSX(<SalesPage />);
  };

  const renderCustomersPage = () => {
    setPageJSX(<Customers />);
  };

  const renderOrdersPage = () => {
    setPageJSX(<ListOrder />);
  };

  useEffect(fetchCustomer, []);
  useEffect(renderLoginJSX, [customer, isPageLoaded, history]);
  useEffect(renderAdminBar, [customer, isPageLoaded]);

  return (
    <div className='admin'>
      {loginJSX}
      {adminBarJSX}
      {pageJSX}
    </div>
  );
}

export default Admin;
