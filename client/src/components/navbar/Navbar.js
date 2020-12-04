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
    <div className='navbar'>
      <nav>
        <ul>
          <div className='leftLinks'>
            <li className='logo'>
              <NavLink to='/'>
                <img src={Logo} />
              </NavLink>
            </li>
            <li>
              <iframe
                width='150%'
                height='65'
                scrolling='no'
                frameborder='no'
                allow='autoplay'
                src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/941014264&color=%233c5238&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
              ></iframe>
              <div>
                <a
                  href='https://soundcloud.com/shawnmountenay'
                  title='Drenched Cheese Financial'
                  target='_blank'
                ></a>

                <a
                  href='https://soundcloud.com/shawnmountenay/hey-ramone-v3'
                  title='Hey Ramone'
                  target='_blank'
                ></a>
              </div>
            </li>
          </div>
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
    </div>
  );
}

export default Navbar;
