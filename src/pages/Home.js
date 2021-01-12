import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Item from '../components/ListItem';

// Styles
import '../css/components/music-list.css';

function Home(){
	const [musicList, setMusicList] = useState();

	useEffect(() => {
		axios.get(`http://localhost:3333/all`)
		.then((response) => {
			setMusicList(response.data);
		}).catch(function (error) {
			console.error(error);
		});
	}, []);

	return(
		<div className="page">
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
								return <Item key={index} id={index + 1} music={music} />
							})
					}
				</tbody>
			</table>
		</div>
	);
}

export default Home;