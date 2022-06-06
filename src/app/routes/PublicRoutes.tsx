import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'app/pages/dashboard';
import Location from 'app/pages/location';
import Episode from 'app/pages/episode';

const PublicRoutes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/location" component={Location} />
    <Route exact path="/episode" component={Episode} />
  </Switch>
);

export default PublicRoutes;
