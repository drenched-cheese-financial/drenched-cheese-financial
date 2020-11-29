import React, { useState, useEffect } from 'react';

function OrderShipment(props) {
  const [updateJSX, setUpdateJSX] = useState();

  const renderShipment = () => {
    let update = props.shipment.update;
    let entries = [];
    let success = true;
    for (var entry of update) {
      if (entry.success) {
        entries.push(
          <p key={entry.productId}>
            Successfully ordered product{' '}
            <span className='enlighten'>{entry.productId}</span>:{' '}
            <span className='enlighten'>{entry.productName}</span> (x
            <span className='enlighten'>{entry.quantity}</span>) | Existing
            Stock: <span className='enlighten'>{entry.prevInventory}</span> |
            New Stock: <span className='enlighten'>{entry.newInventory}</span>
          </p>
        );
      } else {
        entries.push(
          <p key={entry.productId}>
            Failed to order product{' '}
            <span className='enlighten'>{entry.productId}</span>:{' '}
            <span className='enlighten'>{entry.productName}</span>. Insufficient
            inventory in warehouse.
          </p>
        );
        success = false;
        break;
      }
    }

    if (success) {
      entries.push(<h3 key={'summary'}>Shipment successfully processed.</h3>);
    } else {
      entries.push(<h3 key={'summary'}>Shipment failed.</h3>);
    }

    setUpdateJSX(entries);
  };

  useEffect(renderShipment, [props.shipment]);

  return (
    <div>
      <h1>Shipment Details</h1>
      <div>{updateJSX}</div>
    </div>
  );
}

export default OrderShipment;
