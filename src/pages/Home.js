import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Item from '../components/ListItem';

import '../css/components/music-list.css';

function Home(props){
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
						<th>Artista</th>
						<th>Albúm</th>
						<th className="duration-th">Duração</th>
					</tr>
				</thead>
				<tbody>
					{
						!musicList ? 'Carregando . . .' 
							: musicList.map((music, index) => {
								return <Item key={index} music={music} setMedia={props.setMedia} />
							})
					}
				</tbody>
			</table>
		</div>
	);
}

export default Home;