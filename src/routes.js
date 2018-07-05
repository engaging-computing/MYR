import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Ide from './containers/Ide';
import Guided from './containers/Guided';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
			  <Route exact path='/' component={Ide}/>
				<Route path='/:id' component={Ide}/>
				<Route path='/edit/:id' component={Ide}/>
				<Redirect from="/edit" exact to="/" />
			  <Redirect from='/view/:id' to="/:id" />
				<Redirect from="/view" exact to="/" />
				<Route path='/lesson' component={Guided}/>
			</Switch>
		</BrowserRouter>
	);
};
