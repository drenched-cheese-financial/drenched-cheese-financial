import React, { useState } from 'react';
import axios from 'axios';

function Shipment() {
  const [orderIsValid, setOrderIsValid] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (event) => {
    setOrderId(event.target.value);
  };

  const addToShipment = () => {
    axios
      .get('http://localhost:3001/ship?orderId=' + orderId, {
        withCredentials: true,
      })
      .then((response) => {
        setOrderIsValid(response.data);
      });
  };

  return (
    <div>
      {JSON.stringify(orderIsValid)}
      <input onChange={handleChange} />
      <button onClick={addToShipment}>add to shipment</button>
    </div>
  );
}

export default Shipment;
