import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListOrder() {
  // Declare a new state variable, which we'll call "count"
  const [orderList, setOrderList] = useState(null);

  useEffect(() => {
    // Fetch the data on load
    axios.get('localhost:3001/listorder').then((response) => {
      setOrderList(response);
    });
  }, []);

  return (
    <div>
      {'hey there'}
      <p>{orderList}</p>
    </div>
  );
}

export default ListOrder;
