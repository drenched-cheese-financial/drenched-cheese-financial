import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DaBoys from '../../assets/images/daBoys/daBoys.png';
import Logo from '../../assets/images/daBoys/dcf-mold-money-flat.png';
import './shop.scss';

function Shop() {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [usernameJSX, setUsernameJSX] = useState();

  const fetchUsername = () => {
    axios
      .get('http://localhost:3001/customer', {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.username);
      });
  };

  const renderUsername = () => {
    if (username) {
      setUsernameJSX(<p>You are signed in as {username}</p>);
    } else {
      setUsernameJSX();
    }
  };

  useEffect(fetchUsername, []);
  useEffect(renderUsername, [username]);

  return (
    <div className='shop'>
      <br />
      <img id='logo' src={Logo} />
      <br />
      <img id='daBoys' src={DaBoys} />
      <br />

      <button
        onClick={() => {
          history.push('/listprod');
        }}
      >
        Get Drenched
      </button>

      {usernameJSX}
    </div>
  );
}

export default Shop;
