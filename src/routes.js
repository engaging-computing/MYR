import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Ide from './containers/Ide';
import Viewer from './containers/Viewer';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
			  <Route exact path='/' component={Ide}/>
			  <Route path='/view' component={Viewer}/>
			</Switch>
		</BrowserRouter>
	);
};
