import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DaBoys from '../../assets/images/daBoys/daBoysFlat.png';
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
      {/* <button
        onClick={() => {
          history.push('/listprod');
        }}
      >
        Get Drenched
      </button>
      <img id='daBoys' alt='da boys' src={DaBoys} /> */}
      <button
        onClick={() => {
          history.push('/listprod');
        }}
      >
        Get Drenched
      </button>
      <div className='bois'>
      </div>

      {usernameJSX}
    </div>
  );
}

export default Shop;
