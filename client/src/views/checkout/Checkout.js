import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ValidationForm from '../../components/validation/ValidationForm';
import Payment from './payment/Payment';
import ShipInfo from './ship-info/ShipInfo';

function Checkout() {
  const history = useHistory();
  const [authId, setAuthId] = useState();
  const [showPayShip, setShowPayShip] = useState(false);

  const handleValidate = (authId) => {
    setAuthId(authId);
    setShowPayShip(true);

    //after validation, show "login credentials valid"
    //then show payment form and shipment form components
  };

  // history.push('/order/' + authId);

  return (
    <div>
      {!showPayShip && (
        <div>
          <h1>Enter your customer ID to complete the transaction:</h1>
          <ValidationForm onValidate={handleValidate} />
        </div>
      )}

      {showPayShip && (
        <div>
          <h1>Payment</h1>
          <Payment />
        </div>
      )}
      {showPayShip && <ShipInfo />}
    </div>
  );
}

export default Checkout;
