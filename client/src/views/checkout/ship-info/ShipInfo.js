import React, { useState } from 'react';
import './../payShip.scss';
const lookupCty = require('country-code-lookup');
//https://www.npmjs.com/package/country-code-lookup

const postalJS = require('postal-codes-js');
//postalJS eg:
//postalJS.validate('bg', '1003');

//need these for shipment
//address
// //city                VARCHAR(40),
// state               VARCHAR(20),
// postalCode          VARCHAR(20),
// country
//custId

function ShipInfo() {
  const [shipData, setShipData] = useState();

  const handleSubmit = () => {
    //implement me
  };

  return (
    <div className='payment'>
      <h1>Shipment Info</h1>
      <span>
        <label>
          Country:
          <input placeholder='CA'></input>
        </label>
      </span>
      <span>
        <label>
          Region:
          <input placeHolder='BC' />
        </label>
      </span>
      <span>
        <label>
          Postal Code:
          <input placeHolder='V1V 1C7' />
        </label>
      </span>
      <span>
        <label>
          City:
          <input placeHolder='Kelowna' />
        </label>
      </span>
      <span>
        <label>
          Address:
          <input placeHolder='2525 Glenmore Rd' />
        </label>
      </span>
      <button className='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default ShipInfo;
