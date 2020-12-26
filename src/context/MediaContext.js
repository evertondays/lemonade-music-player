import React, { createContext, useContext, useState } from 'react';

const MediaContext = createContext();

export default function PlayerProvider(props){

	const [media, setMedia] = useState({
		name: 'Um Brinde Pra Nós',
		artist: 'Hungria Hip Hop',
		album: 'Hungria vol. 4',
		image: 'https://statig1.akamaized.net/bancodeimagens/6j/yv/mx/6jyvmx9n8o0fpsnd2c9uq30tt.jpg',
		file: 'http://localhost:3333/song/0d64c33553713870b403b591fab3e940.mp3'
	});

	return(
		<MediaContext.Provider value={{media, setMedia}}>
			{props.children}
		</MediaContext.Provider>
	);
}

export function useMedia(){
	const context = useContext(MediaContext);
	const {media, setMedia} = context;

	return {media, setMedia};
}