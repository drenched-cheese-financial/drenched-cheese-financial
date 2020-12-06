import React from 'react';
import { useHistory } from 'react-router-dom';
import './shop.scss';

function Shop() {
  const history = useHistory();

  const handleShop = () => {
    history.push('/listprod');
  };

  return (
    <div className='shop'>
      <div className='bois'>
        <button onClick={handleShop}>Get Drenched</button>
      </div>
    </div>
  );
}

export default Shop;
