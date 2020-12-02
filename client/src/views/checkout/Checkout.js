import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ValidationForm from '../../components/validation/ValidationForm';
import Payment from './payment/Payment';
import ShipInfo from './ship-info/ShipInfo';

function Checkout() {
  const history = useHistory();
  const [authId, setAuthId] = useState();
  const [showPayShip, setShowPayShip] = useState(false);
  const [payComplete, setPayComplete] = useState(false);
  const [shipComplete, setShipComplete] = useState(false);

  const handleValidate = (authId) => {
    setAuthId(authId);
    setShowPayShip(true);

    //after validation, show "login credentials valid"
    //then show payment form and shipment form components
  };
  const handlePaymentComplete = (payComplete) => {
    setPayComplete(payComplete);
  };

  const handleShipComplete = (shipComplete) => {
    setShipComplete(shipComplete);
  };

  // history.push('/order/' + authId);

  return (
    <div>
      {
        //should be !showPayShip
        !showPayShip && (
          <div>
            <h1>
              Enter your login info to
              <br /> complete the transaction
            </h1>
            <ValidationForm onValidate={handleValidate} />
          </div>
        )
      }

      {showPayShip && !payComplete && (
        <div>
          <h1>Payment</h1>
          <Payment paymentComplete={handlePaymentComplete} custId={authId} />
        </div>
      )}
      {
        //should be payCompete
        payComplete && (
          <ShipInfo shipComplete={handleShipComplete} custId={authId} />
        )
      }
    </div>
  );
}

export default Checkout;
