import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../payShip.scss';
import {
  canadianProvinces,
  americanStates,
  nums,
  alphabet,
} from './addressData';
const validator = require('validator');

//need these for shipment
//address
// //city                VARCHAR(40),
// state               VARCHAR(20),
// postalCode          VARCHAR(20),
// country
//custId

function ShipInfo(props) {
  const [shipData, setShipData] = useState();
  const [addressValid, setAddressValid] = useState();
  const [cityValid, setCityValid] = useState();
  const [postalCodeValid, setPostalCodeValid] = useState();
  const [postalCode, setPostalCode] = useState();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState();
  const [cityPlaceHolder, setCityPlaceHolder] = useState('Kelowna');
  const [addressPlaceHolder, setAddressPlaceHolder] = useState(
    '5050 Dab-dat way'
  );
  const [postalCodePlaceHolder, setPostalCodePlaceHolder] = useState('V1R 1C3');
  const [shipDataReceived, setShipDataReceived] = useState(false);

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

  const sendShipDataToDB = () => {
    axios
      .post(
        'https://the-drenched-cheese-financial.herokuapp.com/shipinfo',
        { shipData },
        { withCredentials: true }
      )
      .then((res) => {
        setShipDataReceived(res.data);
        setTimeout(function () {
          props.shipComplete(res.data);
        }, 1700);
      });
  };

  const handleSubmit = () => {
    if (addressValid && postalCodeValid && cityValid) {
      setShipData({
        address: address,
        city: city,
        state: region.abbreviation,
        postalCode: postalCode,
        country: country.name,
        customerId: props.custId,
      });
    }
  };

  useEffect(sendShipDataToDB, [shipData, props, shipDataReceived]);

  const handleCity = (event) => {
    setCity(event.target.value);

    if (validator.isLength(event.target.value, { min: 2 })) setCityValid(true);
    else {
      setCityValid(false);
    }
  };

  const handlePostalCode = (event) => {
    setPostalCode(event.target.value);
    if (event)
      if (country.abbreviation === 'CA') {
        if (
          validator.isLength(event.target.value, { min: 6, max: 7 }) &&
          customValidation(event.target.value)
        ) {
          setPostalCodeValid(true);
        } else {
          setPostalCodeValid(false);
        }
      } else if (country.abbreviation === 'US') {
        if (
          validator.isLength(event.target.value, { min: 5, max: 5 }) &&
          validator.isNumeric(event.target.value)
        ) {
          setPostalCodeValid(true);
        } else {
          setPostalCodeValid(false);
        }
      }
  };

  const handleCanada = () => {
    setCountry({ name: 'Canada', abbreviation: 'CA' });
    setRegion({ name: 'Alberta', abbreviation: 'AB' });
    handleCountryOrRegion();
    setCityPlaceHolder('Kelowna');
    setAddressPlaceHolder('5050 Dab-dat way');
    setPostalCodePlaceHolder('V1R 1C3');
  };

  const handleMurica = () => {
    setCountry({ name: 'United States', abbreviation: 'US' });
    setRegion({ name: 'Alabama', abbreviation: 'AL' });
    handleCountryOrRegion();
    setCityPlaceHolder('Kansas');
    setAddressPlaceHolder('714 Gumbo Street');
    setPostalCodePlaceHolder('16661');
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
    if (
      validator.isLength(event.target.value, { min: 4 }) &&
      customValidation(event.target.value)
    ) {
      setAddressValid(true);
    } else {
      setAddressValid(false);
    }
  };

  const handleCountryOrRegion = (event) => {
    setAddress('');
    setAddressValid(false);
    setPostalCode('');
    setPostalCodeValid(false);
    setCity('');
    setCityValid(false);
  };

  useEffect(handleCountryOrRegion, [country, region]);

  return (
    <div className='payment'>
      <h1>Shipment Info</h1>
      <span>
        <label>
          Country:
          <div className='dropdown'>
            <button className='valid'>{country.name}</button>
            <div className='dropdown-content'>
              <button onClick={handleCanada}>Canada</button>
              <button onClick={handleMurica}>United States</button>
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
                        handleCountryOrRegion();
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
                        handleCountryOrRegion();
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
            placeholder={addressPlaceHolder}
            onChange={handleAddress}
            type='text'
            value={address}
            name='address'
          />
        </label>
      </span>
      <span>
        <label>
          City:
          <input
            className={cityValid ? 'valid' : ''}
            onChange={handleCity}
            placeHolder={cityPlaceHolder}
            value={city}
            name='city'
          />
        </label>
      </span>
      <span>
        <label>
          Postal Code:
          <input
            className={postalCodeValid ? 'valid' : ''}
            onChange={handlePostalCode}
            placeHolder={postalCodePlaceHolder}
            name='postalCode'
            value={postalCode}
          />
        </label>
      </span>
      {!shipDataReceived ? (
        <span>
          <br />
          <button className='submit' onClick={handleSubmit}>
            Submit
          </button>
        </span>
      ) : (
        <div>
          <p className='textMoney'>
            Shipment Data Received<span className='opacity'> 👍</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ShipInfo;
