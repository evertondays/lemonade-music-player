import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

function Home(props){

	function changeMusic(){
		const newMusic = {
			...props.music,
			file: `http://localhost:3333/song/${props.music.file}`
		}

		props.setMedia(newMusic);
	}

	const audioTag = useRef(null);
	const [duration, setDuration] = useState('?:??');

	useEffect(() => {
		audioTag.current.play()
	}, []);

	return(
		<tr className="list-item">
			<th className="index-th">
				<button onClick={changeMusic} className="btn-play">< FaPlay size={15} /></button>
			</th>
			<th>{props.music.name}</th>
			<th>{props.music.artist}</th>
			<th>{props.music.album}</th>
			<th className="duration-th">{duration}</th>

			<audio src={props.music.file} ref={audioTag}></audio>
		</tr>
	);
}

export default Home;