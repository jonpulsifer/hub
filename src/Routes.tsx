import React from 'react';
import {Switch, Route} from 'react-router';
import {Home, UnifiCam} from './components';

export enum Path {
  Home = '/',
  Cam = '/cam',
}

export function Routes() {
  return (
    <Switch>
      <Route
        exact
        key="home-index"
        path={Path.Home}
        render={() => <Home data="router!" />}
      />
      <Route
        exact
        key="cam-index"
        path={Path.Cam}
        render={() => <UnifiCam />}
      />
    </Switch>
  );
}
