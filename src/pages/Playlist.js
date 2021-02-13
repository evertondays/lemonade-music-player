import React, { useState, useEffect, useRef } from 'react';
import { FaEllipsisH, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Components
import Item from '../components/ListItem';

// Styles
import '../css/components/music-list.css';
import '../css/pages/playlist.css';

function Playlist(props){

	// Id da playlist
	const playlistId = window.location.pathname.split('/')[2];
	
	// Dados da musica
	const [musicList, setMusicList] = useState();
	const [data, setData] = useState({});

	// Options
	const overlay = useRef(null);
	var menuIsVisible = false;

	// History
	const history = useHistory();

	useEffect(() => {
		// Pegando musicas
		axios.get(`http://192.168.1.191:3333/playlist/${playlistId}`)
		.then((response) => {
			setMusicList(response.data);
		}).catch(function (error) {
			console.error(error);
		});

		// Pegando infos
		axios.get(`http://192.168.1.191:3333/playlist-info/${playlistId}`)
			.then((response) => {

				setData(response.data[0])
			}).catch(function (error) {
				console.error(error);
			});
	}, [playlistId]);

	function showPlaylistMenu(){
		if(menuIsVisible){
			overlay.current.style.display = 'none';
		} else {
			overlay.current.style.display = 'flex';
		}

		menuIsVisible = !menuIsVisible;
	}

	function deletePlaylist(){
		let message = window.confirm('Deseja deletar essa playlist?\nAs musicas permaneceram intactas');

		if(message){
			axios.delete(`http://192.168.1.191:3333/delete-playlist/${playlistId}`)
				.then(async (response) => {
					await response;
					
					history.push('/playlists');
				});

		}
	}

	return(
		<div className="page">
			<div className="banner-wrapper" style={{backgroundImage: `url(${data.image})`}}>
				<div className="banner">
					<img src={data.image} alt="Capa"/>
					<h1>{data.name}</h1>
				</div>
			</div>

			<div className="options-wrapper">
				<dv className="left">
					{data.description}
				</dv>
				<div className="right">
					Opções
					<button onClick={showPlaylistMenu} className="btn-options"><FaEllipsisH size={25} /></button>
				</div>

				<div ref={overlay} className="overlay"
					style={{ display: 'none' }} onClick={showPlaylistMenu}
				>
					<div className="sub-menu">
						<div onClick={deletePlaylist} className="item delete"><FaTrashAlt className="icon" />Deletar playlist</div>
					</div>
				</div>
			</div>
			
			<table className="music-list">
				<thead>
					<tr>
						<th className="index-th">#</th>
						<th>Faixa</th>
						<th className="artist-th">Artista</th>
						<th className="album-th">Albúm</th>
						<th className="duration-th">Duração</th>
						<th className="options-th"><center>Opções</center></th>
					</tr>
				</thead>
				<tbody>
					{
						!musicList ? 'Carregando . . .' 
							: musicList.map((music, index) => {
								return <Item key={index} id={index + 1} music={music} playlistId={playlistId} newPlaylist={musicList} />
							})
					}
				</tbody>
			</table>
		</div>
	);
}

export default Playlist;