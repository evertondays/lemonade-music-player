import React, { useState, useEffect } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import axios from 'axios';

// Components
import Item from '../components/ListItem';

// Styles
import '../css/components/music-list.css';
import '../css/pages/playlist.css';

function Playlist(props){

	const playlistId = window.location.pathname.split('/')[2];
	
	const [musicList, setMusicList] = useState();
	const [data, setData] = useState({});

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
					<button className="btn-options"><FaEllipsisH size={25} /></button>
				</div>

				{/* <div className="options">
					<div className="option"><FaTrashAlt />Deletar playlist</div>
				</div> */}
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