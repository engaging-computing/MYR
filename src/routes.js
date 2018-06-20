import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Ide from './containers/Ide';
import Viewer from './containers/Viewer';
import Guided from './containers/Guided';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
			  <Route exact path='/' component={Ide}/>
				<Route path='/edit/:id' component={Ide}/>
				<Redirect from="/edit" exact to="/" />
			  <Route path='/view/:id' component={Viewer}/>
				<Redirect from="/view" exact to="/view/default" />
				<Route path='/lesson/:id' component={Guided}/>
			</Switch>
		</BrowserRouter>
	);
};
