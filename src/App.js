import React from 'react';

import './css/global.css'

import Routes from './routes';

import MediaProvider from './context/MediaContext';
import PlayerProvider from './context/PlayerContext';

function App() {	
	return (
		<div className="App">
			<PlayerProvider>
				<MediaProvider>
					<Routes />
				</MediaProvider>
			</PlayerProvider>
		</div>
  );
}

export default App;