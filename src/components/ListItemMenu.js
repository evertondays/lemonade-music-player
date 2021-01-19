import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

// Styles
import '../css/components/sub-menu-item.css';

function ListItemMenu(props){
	const [playlists, setPlaylist] = useState([]);

	useEffect(() => {
		axios.get('http://192.168.1.191:3333/all-playlists')
			.then((response) => {
				setPlaylist(response.data);
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	function deleteItem(){
		var options = {method: 'DELETE', url: `http://192.168.1.191:3333/music/${props.id}`};

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
		axios.post(`http://192.168.1.191:3333/add-song-playlist/${playlistId}/${props.id}`)
			.then(async (response) => {
				let responseData = await response.data;
				console.log(responseData)

				alert('Okay música adicionada ;)');
			})
			.catch((error) => {
				console.error(error);
			})
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
			<div onClick={deleteItem} className="delete item"><FaTrashAlt className="icon" /> Excluir</div>
		</div>
	);
}

export default ListItemMenu;