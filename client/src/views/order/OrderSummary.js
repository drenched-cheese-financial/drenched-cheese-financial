import React from 'react';
import Box from '../../assets/images/box.png';
import OrderSummaryTable from './OrderTable';

function OrderSummary(props) {
  return (
    <div>
      <OrderSummaryTable products={props.order.products} />
      <p>Order completed. Will be shipped soon...</p>
      <img alt='box' src={Box} />
      <p>
        Order reference number: <span className='enlighten'>{props.order.id}</span>
      </p>
      <p>
        Customer id: &nbsp;
        <span className='enlighten'>{props.order.customer.id} </span>
      </p>
      <p>
        Shipped to{' '}
        <span className='enlighten'>
          {props.order.customer.firstName} {props.order.customer.lastName}{' '}
        </span>
        <br />
      </p>
    </div>
  );
}

export default OrderSummary;
