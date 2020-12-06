import React from 'react';
import { useHistory } from 'react-router-dom';
import ValidationForm from '../../components/validation/ValidationForm';

function Login() {
  const history = useHistory();

  const handleValidate = () => {
    history.push('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <ValidationForm onValidate={handleValidate} />
    </div>
  );
}

export default Login;
