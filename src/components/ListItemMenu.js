import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';

// Styles
import '../css/components/sub-menu-item.css';

function ListItemMenu(props){

	const playlistId = window.location.pathname.split('/')[2];
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		// Pegando lista de playlist
		axios.get('http://localhost:3333/all-playlists')
			.then((response) => {
				setPlaylists(response.data);
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	function deleteItem(){
		var options = {method: 'DELETE', url: `http://localhost:3333/music/${props.id}`};

		axios.request(options)
			.then(async (response) => {
				let responseData = await response.data;
				console.log(responseData)

				window.location.href='http://localhost:3000/';
			}).catch((error) => {
				console.error(error);
			});
	}

	function addMusicToPlaylist(playlistId){
		axios.post(`http://localhost:3333/add-song-playlist/${playlistId}/${props.id}`)
			.then(async (response) => {
				let responseData = await response.data;
				console.log(responseData);
			})
			.catch((error) => {
				console.error(error);
			})
	}

	function removePlaylist(){
		if(typeof playlistId == 'undefined'){
			alert('Você não pode remover dessa playlist')
		} else {
			axios.delete(`http://localhost:3333/remove-song-playlist/${playlistId}/${props.id}`)
				.then(async (response) => {
					let responseData = await response.data;
					console.log(responseData);
			})
		}
	}

	return(
		<div className="sub-menu">
			{
				playlists.map((playlist) => {
					return (
						<div onClick={() => addMusicToPlaylist(playlist.id)} className="item">
							<FaPlus className="icon" />Adicionar em '{playlist.name}'
						</div>
					)
				})
			}
			<div onClick={removePlaylist} className="item"><FaTimes className="icon" /> Remover da playlist</div>
			<div onClick={deleteItem} className="delete item"><FaTrashAlt className="icon" /> Excluir</div>
		</div>
	);
}

export default ListItemMenu;