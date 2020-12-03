import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import OrderSummary from './OrderSummary';
import './order.scss';
import OrderShipment from './OrderShipment';

function Order() {
  const { customerId } = useParams();
  const history = useHistory();
  const [order, setOrder] = useState();
  const [errorJSX, setErrorJSX] = useState();
  const [orderJSX, setOrderJSX] = useState();
  const [shipmentJSX, setShipmentJSX] = useState();

  const completeOrder = () => {
    let params = new URLSearchParams('customerId=' + customerId);
    axios
      .get(process.env.APP_URL + '/order?' + params, { withCredentials: true })
      .then((res) => {
        setOrder(res.data);
      });
  };

  const renderOrder = () => {
    if (order) {
      if (!order.err) {
        setOrderJSX(<OrderSummary order={order} />);
      }
    } else {
      setOrderJSX(<div>Failed to load order!</div>);
    }
  };

  const renderError = () => {
    if (order && order.err) {
      setErrorJSX(<div>{order.err}</div>);
    } else {
      setErrorJSX();
    }
  };

  const renderShipment = () => {
    if (order && !order.err) {
      setShipmentJSX(<OrderShipment shipment={order.shipment} />);
    } else {
      setShipmentJSX();
    }
  };

  const handleFinish = () => {
    history.push('/');
  };

  useEffect(completeOrder, [customerId]);
  useEffect(renderOrder, [order]);
  useEffect(renderError, [order]);
  useEffect(renderShipment, [order]);

  return (
    <div>
      <h1>Your Order Summary</h1>
      {orderJSX}
      {errorJSX}
      <br />
      {shipmentJSX}
      <button onClick={handleFinish}>Finish</button>
    </div>
  );
}

export default Order;
