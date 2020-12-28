import React, { createContext, useContext, useState } from 'react';

const MediaContext = createContext();

export default function PlayerProvider(props){

	const [media, setMedia] = useState({
		name: "The way you make me feel",
		artist: "Michael Jackson",
		album: "Sob a Luz da Fama",
		duration: 298.162,
		image: "https://miro.medium.com/max/1200/1*vUfjKHf1HFRezqkzqxz-_w.jpeg",
		file: "http://localhost:3333/song/23aad39e8429c6e38c054c16f3a37098.mp3"
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