import React from 'react';
import { BrowserRouter, Route, Switch, /*Redirect*/ } from 'react-router-dom';
import Ide from './containers/Ide';
import Guided from './containers/Guided';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Ide} />
        <Route path='/lesson' component={Guided} />
        <Route path='/:id' component={Ide} />
      </Switch>
    </BrowserRouter>
  );
};
