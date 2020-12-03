import React, { useState } from 'react';
import Main from '../components/main/Main';
import Navbar from '../components/navbar/Navbar';
import './app.scss';

function App() {
  const [location, setLocation] = useState();

  const handleRouteUpdate = (location) => {
    setLocation(location);
  }

  return (
    <div className='App'>
      <Navbar location={location} />
      <Main onRouteUpdate={handleRouteUpdate} />
    </div>
  );
}

export default App;
