import React from 'react';

import { Router } from '@reach/router';
import Home from './pages/Home';
import Country from './pages/Country';

function App() {
  return (
    <Router>
      <Home default path="/" />
      <Country path="/:country" />
    </Router>
  );
}

export default App;
