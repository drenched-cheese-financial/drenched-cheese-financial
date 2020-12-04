import React, { useState, useEffect } from 'react';
import validator from 'validator';
import ProfileInput from './ProfileInput';
import './profileForm.scss';

function ProfileForm(props) {
  const [customer, setCustomer] = useState();
  const [validation, setValidation] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formJSX, setFormJSX] = useState();

  const handleValidateText = (
    name,
    value,
    options = { min: 0, max: 100, isNumeric: false, isAlpha: false, isAlphanumeric: false, isSingle: false }
  ) => {
    let isValid = true;
    isValid = isValid && validator.isLength(value, { min: options.min, max: options.max });
    isValid = isValid && (!options.isNumeric || validator.isNumeric(value));
    isValid = isValid && (!options.isAlpha || validator.isAlpha(value.replace(/\s+/g, '')));
    isValid = isValid && (!options.isAlphanumeric || validator.isAlphanumeric(value.replace(/\s+/g, '')));
    isValid = isValid && (!options.isSingle || !validator.contains(value, ' '));
    setValidation((validation) => ({ ...validation, [name]: isValid }));
  };

  const handleValidateEmail = (name, value, options = { max: 50 }) => {
    let isValid = true;
    isValid = isValid && validator.isEmail(value);
    isValid = isValid && validator.isLength(value, { max: options.max });
    setValidation((validation) => ({ ...validation, [name]: isValid }));
  };

  const handleValidatePhone = (name, value, options = { max: 20 }) => {
    let isValid = true;
    isValid = isValid && validator.isMobilePhone(value);
    isValid = isValid && validator.isLength(value, { max: options.max });
    setValidation((validation) => ({ ...validation, [name]: isValid }));
  };

  const handleChange = (event) => {
    setCustomer((customer) => ({ ...customer, [event.target.name]: event.target.value }));
  };

  const renderFormJSX = () => {
    const handleConfirm = (event) => {
      let confirm = event.target.value;
      console.log(customer.password === confirm);
      setValidation((validation) => ({ ...validation, confirmPassword: customer.password === confirm }));
      setConfirmPassword(confirm);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (isFormValid) {
        props.onSubmit(customer);
      } else {
        window.scrollTo(0, 0);
      }
    };

    if (customer) {
      setFormJSX(
        <form className='customer' onSubmit={handleSubmit}>
          <div className='split'>
            <h1>{props.title}</h1>
            <h3>
              ID: <span className='highlight'>{customer.id}</span>
            </h3>
          </div>
          <hr />
          {!isFormValid ? <h4 className='error'>Some values entered are invalid!</h4> : ''}
          <h2>Contact Information</h2>
          <ProfileInput
            type='text'
            label='Username'
            name='username'
            value={customer.username}
            isValid={validation.username}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ min: 4, max: 20, isAlphanumeric: true, isSingle: true }}
          />
          <ProfileInput
            type='text'
            label='First Name'
            name='firstName'
            value={customer.firstName}
            isValid={validation.firstName}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ max: 30, isAlpha: true }}
          />
          <ProfileInput
            type='text'
            label='Last Name'
            name='lastName'
            value={customer.lastName}
            isValid={validation.lastName}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ max: 30, isAlpha: true }}
          />
          <div className='left'>
            <ProfileInput
              type='password'
              label='Password'
              name='password'
              value={customer.password}
              isValid={validation.password}
              onValidate={handleValidateText}
              onChange={handleChange}
              validateOptions={{ max: 30 }}
            />
            {validation.password !== undefined ? (
              <ProfileInput
                type='password'
                label='Confirm Password'
                name='confirmPassword'
                value={confirmPassword}
                isValid={validation.confirmPassword}
                onChange={handleConfirm}
              />
            ) : (
              ''
            )}
          </div>
          <ProfileInput
            type='text'
            label='Email'
            name='email'
            value={customer.email}
            isValid={validation.email}
            onValidate={handleValidateEmail}
            onChange={handleChange}
          />
          <ProfileInput
            type='tel'
            label='Phone Number'
            name='phone'
            value={customer.phone}
            isValid={validation.phone}
            onValidate={handleValidatePhone}
            onChange={handleChange}
          />
          <h2>Address Information</h2>
          <ProfileInput
            type='text'
            label='Country'
            name='country'
            value={customer.country}
            isValid={validation.country}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ max: 40 }}
          />
          <ProfileInput
            type='text'
            label='State/Province'
            name='state'
            value={customer.state}
            isValid={validation.state}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ max: 20 }}
          />
          <ProfileInput
            type='text'
            label='City'
            name='city'
            value={customer.city}
            isValid={validation.city}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ max: 40 }}
          />
          <ProfileInput
            type='text'
            label='Address'
            name='address'
            value={customer.address}
            isValid={validation.address}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ min: 4, max: 40, isAlphanumeric: true }}
          />
          <ProfileInput
            type='text'
            label='Zip/Postal Code'
            name='postalCode'
            value={customer.postalCode}
            isValid={validation.postalCode}
            onValidate={handleValidateText}
            onChange={handleChange}
            validateOptions={{ min: 5, max: 7, isAlphanumeric: true }}
          />
          <br />
          <div className='center'>
            <input type='submit' value={props.buttonLabel} />
          </div>
        </form>
      );
    } else {
      setFormJSX();
    }
  };

  useEffect(() => setCustomer(props.customer), [props.customer]);
  useEffect(() => setIsFormValid(Object.values(validation).every((isValid) => isValid)), [validation]);
  useEffect(renderFormJSX, [customer, validation, confirmPassword, isFormValid, props]);

  return <div className='profile'>{formJSX}</div>;
}

export default ProfileForm;
