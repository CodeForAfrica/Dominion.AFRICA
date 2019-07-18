import React from 'react';

import { Router } from '@reach/router';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Home default path="/" />
    </Router>
  );
}

export default App;
