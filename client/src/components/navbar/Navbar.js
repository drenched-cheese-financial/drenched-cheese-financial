import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './navbar.scss';
import Logo from '../../assets/images/daBoys/dcf-mold-money-flat.png';

function Navbar(props) {
  const [customer, setCustomer] = useState();
  const [usernameJSX, setUsernameJSX] = useState();
  const [adminJSX, setAdminJSX] = useState();
  const [accountJSX, setAccountJSX] = useState();

  const fetchUser = () => {
    axios
      .get('https://the-drenched-cheese-financial.herokuapp.com/customer', {
        withCredentials: true,
      })
      .then((res) => {
        setCustomer(res.data);
      });
  };

  const renderUsernameJSX = () => {
    if (customer) {
      setUsernameJSX(
        <div className='linkGroup'>
          <li>
            <h3>{customer.username}</h3>
          </li>
          <li>
            <h3>-</h3>
          </li>
        </div>
      );
    } else {
      setUsernameJSX();
    }
  };

  const renderAdminJSX = () => {
    if (customer && customer.isAdmin) {
      setAdminJSX(
        <div className='linkGroup'>
          <li>
            <NavLink to='/admin'>
              <h3>Admin Panel</h3>
            </NavLink>
          </li>
          <li>
            <h3>-</h3>
          </li>
        </div>
      );
    } else {
      setAdminJSX();
    }
  };

  const renderAccountJSX = () => {
    if (customer) {
      setAccountJSX(
        <div className='linkGroup'>
          <li>
            <NavLink to='/profile'>
              <h3>My Profile</h3>
            </NavLink>
          </li>
          <li>
            <h3>-</h3>
          </li>
          <li>
            <NavLink to='/orders'>
              <h3>My Orders</h3>
            </NavLink>
          </li>
          <li>
            <h3>-</h3>
          </li>
          <li>
            <NavLink to='/logout'>
              <h3>Logout</h3>
            </NavLink>
          </li>
        </div>
      );
    } else {
      setAccountJSX(
        <div className='linkGroup'>
          <li>
            <NavLink to='/login'>
              <h3>Login</h3>
            </NavLink>
          </li>
          <li>
            <h3>-</h3>
          </li>
          <li>
            <NavLink to='/register'>
              <h3>Register</h3>
            </NavLink>
          </li>
        </div>
      );
    }
  };

  useEffect(fetchUser, [props.location]);
  useEffect(renderUsernameJSX, [customer]);
  useEffect(renderAdminJSX, [customer]);
  useEffect(renderAccountJSX, [customer]);

  return (
    <div className='navbar'>
      <nav>
        <ul>
          <div className='leftLinks'>
            <li className='logo'>
              <NavLink to='/'>
                <img alt='logo' src={Logo} />
              </NavLink>
            </li>
          </div>
          <div className='rightLinks'>
            {usernameJSX}
            {adminJSX}
            <li>
              <NavLink to='/listprod'>
                <h3>Begin Shopping</h3>
              </NavLink>
            </li>
            <li>
              <h3>-</h3>
            </li>
            {accountJSX}
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
