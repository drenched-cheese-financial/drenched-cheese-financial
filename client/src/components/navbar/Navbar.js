import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './navbar.scss';

function Navbar(props) {
  const [customer, setCustomer] = useState();
  const [usernameJSX, setUsernameJSX] = useState();
  const [adminJSX, setAdminJSX] = useState();
  const [accountJSX, setAccountJSX] = useState();

  const fetchUser = () => {
    axios
      .get('http://localhost:3001/customer', {
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
          <li>{customer.username}</li>
          <li>-</li>
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
            <NavLink to='/admin'>Admin View</NavLink>
          </li>
          <li>-</li>
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
            <NavLink to='/profile'>My Profile</NavLink>
          </li>
          <li>-</li>
          <li>
            <NavLink to='/orders'>My Orders</NavLink>
          </li>
          <li>-</li>
          <li>
            <NavLink to='/logout'>Logout</NavLink>
          </li>
        </div>
      );
    } else {
      setAccountJSX(
        <div className='linkGroup'>
          <li>
            <NavLink to='/login'>Login</NavLink>
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
    <nav>
      <ul>
        <li className='logo'>
          <NavLink to='/'>
            <span className='emojis'>💰 🧀</span> <span className='tallLetter'>D</span>renched{' '}
            <span className='tallLetter'>C</span>heese <span className='tallLetter'>F</span>inancial{' '}
            <span className='emojis'>🧀 💰</span>
          </NavLink>
        </li>
        <div className='rightLinks'>
          {usernameJSX}
          <li>
            <NavLink to='/listprod'>Begin Shopping</NavLink>
          </li>
          <li>-</li>
          <li>
            <NavLink to='/listorder'>List Orders</NavLink>
          </li>
          <li>-</li>
          {adminJSX}
          {accountJSX}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
