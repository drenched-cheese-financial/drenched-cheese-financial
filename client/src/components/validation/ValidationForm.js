import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ValidationForm(props) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errorJSX, setErrorJSX] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3001/validate',
        {
          username: credentials.username,
          password: credentials.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        let authId = res.data.authId;
        let isAdmin = res.data.isAdmin;
        console.log(isAdmin);
        if (authId >= 0 && (!props.requireAdmin || isAdmin)) {
          props.onValidate(authId);
        } else {
          setErrorJSX(<p>Failed to connect using entered credentials.</p>);
        }
      });
  };

  const handleChange = (event) => {
    setCredentials((credentials) => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  };

  const onLoad = () => {
    if (props.isFromRedirect) {
      setErrorJSX(<p>Credentials are required for access to this page.</p>);
    }
  };

  useEffect(onLoad, [props.isFromRedirect]);

  return (
    <div>
      {errorJSX}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type='text' name='username' value={credentials.username} onChange={handleChange} />
          <br />
          Password: <input type='password' name='password' value={credentials.password} onChange={handleChange} />
          <br />
        </label>
        <br />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

export default ValidationForm;
