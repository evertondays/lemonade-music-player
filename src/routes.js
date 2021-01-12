import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import RegisterMusic from './pages/RegisterMusic';
import Playlists from './pages/Playlists';

// Components
import Navbar from './components/Navbar';
import Player from './components/Player';

export default function Routes(){
	return(
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/register-music">
					<RegisterMusic />
				</Route>
				<Route path="/playlists">
					<Playlists />
				</Route>
			</Switch>
			<Player />
		</BrowserRouter>
	);
}