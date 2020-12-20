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
		<tr>
			<th className="index-th"><button onClick={changeMusic}>Play</button></th>
			<th>{props.music.name}</th>
			<th>{props.music.artist}</th>
			<th>{props.music.album}</th>
			<th className="duration-th">?:??</th>
		</tr>
	);
}

export default Home;