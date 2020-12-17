import React, { useState } from 'react';

import './css/global.css'

import Routes from './routes';

function App() {

	const [media, setMedia] = useState({
		name: 'Um Brinde Pra Nós',
		artist: 'Hungria Hip Hop',
		album: 'Hungria vol. 4',
		image: 'https://statig1.akamaized.net/bancodeimagens/6j/yv/mx/6jyvmx9n8o0fpsnd2c9uq30tt.jpg',
		file: 'http://localhost:3333/song/0d64c33553713870b403b591fab3e940.mp3'
	});
	
	return (
		<div className="App">
			<Routes media={media} setMedia={setMedia} />
		</div>
  );
}

export default App;