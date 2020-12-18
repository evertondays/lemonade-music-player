import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Item from '../components/ListItem';

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
		<div className="container">
			{
				!musicList ? 'Carregando . . .' 
					: musicList.map((music, index) => {
						return <Item key={index} music={music} />
					})
			}
		</div>
	);
}

export default Home;