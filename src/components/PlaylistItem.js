import React from 'react';
import { FaPlay } from 'react-icons/fa';

function PlaylistItem(props){
	return(
		<div className="item">
			<div className="img" style={{backgroundImage: `url('${props.data.image}')`}}>
				<button><FaPlay /></button>
			</div>
			<h1>{props.data.name}</h1>
		</div>
	)
}

export default PlaylistItem;