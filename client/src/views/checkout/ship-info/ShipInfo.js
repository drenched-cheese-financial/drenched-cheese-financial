import React, { useState } from 'react';
import './../payShip.scss';
import {
  canadianProvinces,
  countries,
  americanStates,
  nums,
  alphabet,
} from './addressData';
const validator = require('validator');
const cities = require('all-the-cities');
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
  const [addressValid, setAddressValid] = useState();
  const [country, setCountry] = useState({
    name: 'Canada',
    abbreviation: 'CA',
  });
  const [region, setRegion] = useState({
    name: 'British Columbia',
    abbreviation: 'BC',
  });

  function customValidation(inputAddress) {
    var space = ' ';
    var addrValid = false;
    alphabet.forEach((element) => {
      for (var i = 0; i < nums.length; i++) {
        if (
          validator.contains(inputAddress, element, { ignoreCase: true }) &&
          validator.contains(inputAddress, space, { ignoreCase: true }) &&
          validator.contains(inputAddress, nums[i], { ignoreCase: true })
        ) {
          addrValid = true;

          return addrValid;
        }
      }
    });
    return addrValid;
  }

  const handleSubmit = () => {
    //implement me
    alert('You working?');
  };

  const handleCities = (event) => {
    alert(cities.filter((city) => city.name.match(event.target.value)));
  };

  const handleAddress = (event) => {
    if (
      validator.isLength(event.target.value, { min: 4 }) &&
      customValidation(event.target.value)
    )
      setAddressValid(event.target.value);
  };
  return (
    <div className='payment'>
      <h1>Shipment Info</h1>
      <span>
        <label>
          Country:
          <div className='dropdown'>
            <button className='valid'>{country.name}</button>
            <div className='dropdown-content'>
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
          <div className='dropdown'>
            <button className='valid '>{region.name}</button>
            <div className='dropdown-content'>
              {country.abbreviation === 'CA' &&
                canadianProvinces.map((province, index) => {
                  return (
                    <button
                      onClick={() => {
                        setRegion(province);
                      }}
                    >
                      {province.name}
                    </button>
                  );
                })}
              {country.abbreviation === 'US' &&
                americanStates.map((state, index) => {
                  return (
                    <button
                      onClick={() => {
                        setRegion(state);
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
          Address:
          <input
            className={addressValid ? 'valid' : ''}
            placeholder='2525 Glenmore Rd'
            onChange={handleAddress}
            type='text'
          />
        </label>
      </span>
      <span>
        <label>
          City:
          <input onChange={handleCities} placeHolder='Kelowna' />
        </label>
      </span>
      <span>
        <label>
          Postal Code:
          <input placeHolder='V1V 1C7' />
        </label>
      </span>
      <button className='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default ShipInfo;
