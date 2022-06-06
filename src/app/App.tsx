import React from 'react';
import {
  BrowserRouter, Route, Switch, Router,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PublicRoutes from 'app/routes/PublicRoutes';
import AppBar from './components/AppBar';

const history = createBrowserHistory();

const App: React.FC = () => (
  <Router history={history}>
    <BrowserRouter>
      <AppBar />
      <Switch>
        <Route>
          <PublicRoutes />
        </Route>
      </Switch>
    </BrowserRouter>
  </Router>
);

export default App;
