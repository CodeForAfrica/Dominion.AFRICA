import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';
import Profile from './pages/Profile';
import Resources from './pages/Resources';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/resources" component={Resources} />
        <Route exact path="/:country" component={Country} />
        <Route exact path="/profile/:geoId" component={Profile} />
        <Route
          exact
          path="/compare/:geoId/vs/:anotherGeoId"
          component={Profile}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
