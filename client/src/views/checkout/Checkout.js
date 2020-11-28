import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Checkout() {
  const history = useHistory();
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push('/order/' + customerId);
  };

  const handleChange = (event) => {
    setCustomerId(event.target.value);
  };

  return (
    <div>
      <h1>Enter your customer ID to complete the transaction:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input type='text' name='customerId' value={customerId} onChange={handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Checkout;
