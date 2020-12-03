import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Shop() {
  const [username, setUsername] = useState();
  const [usernameJSX, setUsernameJSX] = useState();

  const fetchUsername = () => {
    axios
      .get('https://the-drenched-cheese-financial.herokuapp.com/shop', {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data);
      });
  };

  const renderUsername = () => {
    if (username) {
      setUsernameJSX(<p>This is a test {username}</p>);
    } else {
      setUsernameJSX();
    }
  };

  useEffect(fetchUsername, []);
  useEffect(renderUsername, [username]);

  return (
    <div>
      <h1>Drenched Cheese Financial</h1>
      {usernameJSX}
    </div>
  );
}

export default Shop;
