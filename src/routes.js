import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';

// Components
import Player from './components/Player';

export default function Routes(props){
	return(
		<BrowserRouter>
			<Player media={props.media} setMedia={props.setMedia} />
			<Switch>
				<Route exact path="/" >
					<Home setMedia={props.setMedia} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}