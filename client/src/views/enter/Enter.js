import React from 'react';
import { useHistory } from 'react-router-dom';
import Ramone from './../../assets/images/ramone-jesus.png';
import './enter.scss';

function Enter() {
  const history = useHistory();
  return (
    <div className='enter'>
      <br />
      <br />
      <img alt='Ramone' src={Ramone} />
      <br />
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        The father, the son, and the DB
      </button>
    </div>
  );
}
export default Enter;
