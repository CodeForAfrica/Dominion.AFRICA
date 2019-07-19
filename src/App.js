import React from 'react';

import { Router } from '@reach/router';
import Home from './pages/Home';
import Country from './pages/Country';
import Profile from './pages/Profile';

function App() {
  return (
    <Router basepath={process.env.PUBLIC_URL}>
      <Home default path="/" />
      <Country path="/:country" />
      <Profile path="/profile/:geoId" />
      <Profile path="/compare/:geoId/vs/:anotherGeoId" />
    </Router>
  );
}

export default App;
