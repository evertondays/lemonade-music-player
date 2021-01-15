import React, { createContext, useContext, useState } from 'react';

const MediaContext = createContext();

export default function PlayerProvider(props){

	const [media, setMedia] = useState({
		name: "Carregando",
		artist: "Espere um pouco...",
		album: "?",
		duration: 0,
		image: "?",
		file: "?"
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