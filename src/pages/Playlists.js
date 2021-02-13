import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

import Item from '../components/PlaylistItem';

import '../css/pages/playlists.css';

function Playlists(){
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3333/all-playlists')
			.then((response) => {
				setPlaylists(response.data);
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return(
		<div className="playlist-grid">
			{/* Itens  */}
			<div className="item create-playlist">
				<Link to='/register-playlist'>
					<div className="img">
						<FaPlus size={30} />
					</div>
				</Link>
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