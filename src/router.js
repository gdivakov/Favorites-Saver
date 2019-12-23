// @flow
import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Provider from './containers/provider'
import Favorites from './containers/favorites'
import Index from './components/Index';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const ROUTES = [
  {
    path: "/",
    Component: Index,
    exact: true,
  },
  {
    path: "/favorites",
    Component: Favorites,
    exact: true,
  },
  {
    path: "/provider",
    Component: Provider,
    exact: true,
  },
];

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        {Object.values(ROUTES).map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact || false}
            render={props => (
              <route.Component {...props} />
            )}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default AppRouter;