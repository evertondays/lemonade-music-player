import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export default function PlayerProvider(props){
	const [player, setPlayer] = useState({
		playing: false,
		volume: localStorage.getItem('volume') || 0.75,
		muted: false,
		firstMusic: true
	});

	return(
		<PlayerContext.Provider value={{player, setPlayer}}>
			{props.children}
		</PlayerContext.Provider>
	);
}

export function usePlayer(){
	const context = useContext(PlayerContext);
	const {player, setPlayer} = context;

	return {player, setPlayer};
}