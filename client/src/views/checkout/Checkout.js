import React from 'react';
import { useHistory } from 'react-router-dom';
import ValidationForm from '../../components/validation/ValidationForm';

function Checkout() {
  const history = useHistory();
  
  const handleValidate = (authId) => {
    history.push('/order/' + authId);
  }

  return (
    <div>
      <h1>Enter your customer ID to complete the transaction:</h1>
      <ValidationForm onValidate={handleValidate} />
    </div>
  );
}

export default Checkout;
