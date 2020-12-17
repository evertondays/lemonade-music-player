import React from 'react';
import axios from 'axios';

function Home(props){
	function getMusicByAPI(){
		axios.get(`http://localhost:3333/music/19`)
		.then((response) => {
			props.setMedia(response.data)
		}).catch(function (error) {
			console.error(error);
		});
	}

	return(
		<button onClick={getMusicByAPI}>Mudar musica</button>
	);
}

export default Home;