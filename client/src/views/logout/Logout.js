import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const history = useHistory();

  const logoutAndRedirect = () => {
    axios.get('https://the-drenched-cheese-financial.herokuapp.com/logout', { withCredentials: true }).then(() => {
      history.push('/');
    });
  };

  useEffect(logoutAndRedirect, [history]);

  return <div>Logging out...</div>;
}

export default Logout;
