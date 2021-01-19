import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useMedia } from './MediaContext';

const PlaylistContext = createContext();

export default function PlaylistProvider(props){

	const {setMedia} = useMedia();

	useEffect(() => {
		axios.get('http://192.168.1.191:3333/all')
			.then((response) => {
				setPlaylist({data: response.data, music: 0, playlistId: 'all'})
				setMedia(
					{
						...response.data[0],
						file: `http://192.168.1.191:3333/song/${response.data[0].file}`
					}
				)
			})
			.catch((error) => {
				console.log(error)
			})
	}, []);

	const [playlist, setPlaylist] = useState(
		{
			data: [],
			music: 0
		}
	)

	return(
		<PlaylistContext.Provider value={{playlist, setPlaylist}}>
			{props.children}
		</PlaylistContext.Provider>
	);
}

export function usePlaylist(){
	const context = useContext(PlaylistContext);
	const {playlist, setPlaylist} = context;

	return {playlist, setPlaylist};
}