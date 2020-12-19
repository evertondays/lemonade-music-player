import React from 'react';

function Home(props){

	function changeMusic(){
		const newMusic = {
			...props.music,
			file: `http://localhost:3333/song/${props.music.file}`
		}
		props.setMedia(newMusic);
	}

	return(
		<>
			<button onClick={changeMusic}>{props.music.name}</button>
			<br/><br/>
		</>
	);
}

export default Home;