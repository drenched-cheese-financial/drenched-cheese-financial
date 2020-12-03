import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoadData() {
  // Declare a new state variable, which we'll call "count"
  const [loadedData, setLoadedData] = useState(null);

  useEffect(() => {
    // Fetch the data on load
    axios.get(process.env.APP_NAME + '/loaddata', {}).then((response) => {
      setLoadedData(JSON.stringify(response));
    });
  }, []);

  if (loadedData) {
    return (
      <div>
        <p>Data loaded!</p>
        <p>{loadedData}</p>
      </div>
    );
  } else {
    return <p>Data is loading... This may take some time, please wait.</p>;
  }
}

export default LoadData;
