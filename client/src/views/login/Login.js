import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ValidationForm from '../../components/validation/ValidationForm';

function Login() {
  const { comingFrom } = useParams();
  const history = useHistory();
  const [showError, setShowError] = useState(false);

  const handleValidate = () => {
    history.push('/');
  };

  const fetchError = () => {
    let params = new URLSearchParams('route=' + comingFrom);
    setShowError(params.get('route') === 'custInfo');
  };

  useEffect(fetchError, [comingFrom]);

  return (
    <div>
      <h1>Customer Login</h1>
      {showError && (
        <h6>Credentials required for access to customer info page</h6>
      )}

      <ValidationForm onValidate={handleValidate} />
    </div>
  );
}

export default Login;
