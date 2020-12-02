import React, { useState } from 'react';
import './../payShip.scss';

import { canadianProvinces, countries, americanStates } from './addressData';

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
  const [country, setCountry] = useState({
    name: 'Canada',
    abbreviation: 'CA',
  });
  const [region, setRegion] = useState({
    name: 'British Columbia',
    abbreviation: 'BC',
  });

  const handleSubmit = () => {
    //implement me
    alert('You working?');
  };

  const handleRegion = (event) => {
    setRegion(event.target.value);
  };

  return (
    <div className='payment'>
      <h1>Shipment Info</h1>
      <span>
        <label>
          Country:
          <div class='dropdown'>
            <button class='dropbtn'>{country.name}</button>
            <div class='dropdown-content'>
              <button
                onClick={() => {
                  setCountry({ name: 'Canada', abbreviation: 'CA' });
                  setRegion({ name: 'Alberta', abbreviation: 'AB' });
                }}
              >
                Canada
              </button>
              <button
                onClick={() => {
                  setCountry({ name: 'United States', abbreviation: 'US' });
                  setRegion({ name: 'Alabama', abbreviation: 'AL' });
                }}
              >
                United States
              </button>
            </div>
          </div>
        </label>
      </span>
      <span>
        <label>
          Region:
          <div class='dropdown'>
            <button class='dropbtn'>{region.name}</button>
            <div class='dropdown-content'>
              {country.abbreviation === 'CA' &&
                canadianProvinces.map((province, index) => {
                  return (
                    <button key={index} value={province} onClick={handleRegion}>
                      {province.name}
                    </button>
                  );
                })}
              {country.abbreviation === 'US' &&
                americanStates.map((state, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setRegion(state.abbreviation);
                      }}
                    >
                      {state.name}
                    </button>
                  );
                })}
            </div>
          </div>
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
