import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Country from './pages/Country';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import About from './pages/About';
import Embed from './pages/Embed';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/resources" component={Resources} />
        <Route exact path="/about" component={About} />
        <Route exact path="/:country" component={Country} />
        <Route exact path="/profile/:geoId" component={Profile} />
        <Route
          exact
          path="/compare/:geoId/vs/:comparisonGeoId"
          component={Profile}
        />
        <Route
          exact
          path="/embed/:geoId/:sectionId/:chartId"
          component={Embed}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
