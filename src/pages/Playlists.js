import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

import Item from '../components/PlaylistItem';

import '../css/pages/playlists.css';

function Playlists(){
	const [playlists, setPlaylist] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3333/all-playlists')
			.then((response) => {
				setPlaylist(response.data);
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return(
		<div className="playlist-grid">
			{/* Itens  */}
			<div className="item create-playlist">
				<div className="img">
					<FaPlus />
				</div>
				<h1>Criar playlist</h1>
			</div>
			{
				playlists.map((playlist, index) => {
					return (<Item key={index} data={playlist} />)
				})
			}
		</div>
	)
}

export default Playlists;