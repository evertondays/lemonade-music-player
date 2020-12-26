import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';

// Components
import Player from './components/Player';

export default function Routes(){
	return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" >
					<Home />
				</Route>
			</Switch>
			<Player />
		</BrowserRouter>
	);
}