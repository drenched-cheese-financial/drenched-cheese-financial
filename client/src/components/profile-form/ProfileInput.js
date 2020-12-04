import React from 'react';

function ProfileInput(props) {
  const handleChange = (event) => {
    props.onChange(event);
    if (props.onValidate) {
      props.onValidate(props.name, event.target.value, props.validateOptions);
    }
  };

  return (
    <p>
      <label>{props.label}: </label>
      <input
        className={props.isValid !== undefined ? (props.isValid ? 'valid' : 'invalid') : ''}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={handleChange}
      />
    </p>
  );
}

export default ProfileInput;
