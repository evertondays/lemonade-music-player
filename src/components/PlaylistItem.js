import React from 'react';
import { FaPlay } from 'react-icons/fa';

import '../css/components/Playlist/item.css';

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