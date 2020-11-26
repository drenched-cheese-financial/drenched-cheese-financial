import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errorJSX, setErrorJSX] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3001/login',
        {
          username: credentials.username,
          password: credentials.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        let validated = res.data;
        if (validated) {
          history.push('/');
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

  return (
    <div>
      <h1>Enter your credentials to login:</h1>
      {errorJSX}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type='text' name='username' value={credentials.username} onChange={handleChange} />
          <br />
          Password: <input type='password' name='password' value={credentials.password} onChange={handleChange} />
          <br />
        </label>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

export default Login;
