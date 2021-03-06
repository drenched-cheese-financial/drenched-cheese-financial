import React, { useState } from 'react';
import './../payShip.scss';
import axios from 'axios';
var valid = require('card-validator');

function Payment(props) {
  const [creditValid, setCreditValid] = useState(false);
  const [expiryValid, setExpiryValid] = useState(false);
  const [creditData, setCreditData] = useState({
    expiry: false,
    creditType: false,
    creditNumber: false,
    customerId: props.custId,
  });
  const [creditDataReceived, setCreditDataReceived] = useState(false);

  const handleCreditNumber = (event) => {
    try {
      if (valid.number(event.target.value).isPotentiallyValid) {
        setCreditValid(valid.number(event.target.value).isValid);

        setCreditData({
          expiry: creditData.expiry,
          creditType: valid.number(event.target.value, 20).card.type,
          creditNumber: event.target.value,
          customerId: props.custId,
        });
      }
    } catch {}
  };
  const handleExpiryDate = (event) => {
    try {
      setExpiryValid(valid.expirationDate(event.target.value, 20).isValid);

      setCreditData({
        expiry: {
          month: valid.expirationDate(event.target.value, 20).month,
          year: valid.expirationDate(event.target.value, 20).year,
        },
        creditType: creditData.creditType,
        creditNumber: creditData.creditNumber,
        customerId: props.custId,
      });
    } catch {}
  };

  const sendCreditInfoToDB = () => {
    axios
      .post(
        'http://localhost:3001/payment',
        { creditData },
        { withCredentials: true }
      )
      .then((res) => {
        setCreditDataReceived(res.data);
        setTimeout(function () {
          props.paymentComplete(res.data);
        }, 1700);
      });
  };

  const handleSubmit = () => {
    if (expiryValid && creditValid) {
      sendCreditInfoToDB();
    }
  };

  return (
    <div className='payment'>
      <span>
        <label>
          Credit Card Number:
          <input
            className={creditValid ? 'valid' : ''}
            onChange={handleCreditNumber}
            type='text'
          />
        </label>
      </span>

      <span>
        <label>
          Expiry Date:
          <input
            className={expiryValid ? 'valid' : ''}
            placeholder='MM/YYYY'
            onChange={handleExpiryDate}
            type='text'
          />
        </label>
      </span>

      {!creditDataReceived ? (
        <span>
          <br />
          <button className='submit' onClick={handleSubmit}>
            Submit
          </button>
        </span>
      ) : (
        <div>
          <p className='textMoney'>
            Payment Data Received<span className='opacity'> 👍</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Payment;
