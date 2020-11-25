import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrderTable from './OrderTable';

function Order() {
  let { customerId } = useParams();
  const [order, setOrder] = useState();
  const [orderJSX, setOrderJSX] = useState();

  const fetchOrder = () => {
    let params = new URLSearchParams('customerId=' + customerId);
    axios.get('http://localhost:3001/order?' + params).then((res) => {
      setOrder(res.data);
    });
  };

  const renderOrder = () => {
    if (order) {
      if (order.err) {
        setOrderJSX(<div>{order.err}</div>);
      } else {
        setOrderJSX(
          <div>
            <OrderTable products={order.products}></OrderTable>
            <p>Order completed. Product will be shipped shortly.</p>
            <p>Order reference number: {order.id}</p>
            <p>
              Shipped to {order.customer.firstName} {order.customer.lastName} (id {order.customer.id})
            </p>
          </div>
        );
      }
    } else {
      setOrderJSX(<div>Failed to load order!</div>);
    }
  };

  useEffect(fetchOrder, [customerId]);
  useEffect(renderOrder, [order]);

  return (
    <div>
      <h1>Your Order Summary</h1>
      {orderJSX}
    </div>
  );
}

export default Order;
