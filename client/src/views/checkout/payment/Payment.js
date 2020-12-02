import React, { useState } from 'react';
import './payment.scss';
import axios from 'axios';
var valid = require('card-validator');

// paymentMethodId     INT IDENTITY,
// paymentType         VARCHAR(20),
// paymentNumber       VARCHAR(30),
// paymentExpiryDate   DATE,
// customerId          INT,

function Payment() {
  const [creditValid, setCreditValid] = useState(false);
  const [expiryValid, setExpiryValid] = useState(false);
  const [creditData, setCreditData] = useState(false);
  const [creditDataReceived, setCreditDataReceived] = useState(false);

  var tempExpiry, tempCredit;

  const handleCreditNumber = (event) => {
    setCreditValid(valid.number(event.target.value).isValid);
    setCreditData({
      expiry: creditData.expiry,
      credit: valid.number(event.target.value, 20),
      creditNumber: event.target.value,
    });
  };
  const handleExpiryDate = (event) => {
    setExpiryValid(valid.expirationDate(event.target.value, 20).isValid);
    setCreditData({
      expiry: valid.expirationDate(event.target.value, 20),
      credit: creditData.credit,
      creditNumber: creditData.creditNumber,
    });
  };

  const sendCreditInfoToDB = () => {
    axios
      .post(
        'http://localhost:3001/payment',
        { creditData },
        { withCredentials: true }
      )
      .then((res) => {
        setCreditDataReceived(res);
      });
  };

  const handleSubmit = () => {
    if (expiryValid && creditValid) {
      sendCreditInfoToDB();
      //TODO: showCreditCardSubmitted checkmark
      //TODO: show optional "update shipment info button" as well as a "next"  button
    }
  };

  return (
    <div className='payment'>
      <span>
        <label>
          Credit Card Number:
          <input
            className={creditValid && 'valid'}
            value={tempCredit}
            onChange={handleCreditNumber}
            type='text'
          />
        </label>
      </span>

      <span>
        <label>
          Expiry Date:
          <input
            className={expiryValid && 'valid'}
            placeholder='MM/YYYY'
            value={tempExpiry}
            onChange={handleExpiryDate}
            type='text'
          />
        </label>
      </span>
      <span>
        <button className='submit' onClick={handleSubmit}>
          Submit {creditDataReceived && <p>Payment Data Received 👍</p>}
        </button>
      </span>
    </div>
  );
}

export default Payment;
