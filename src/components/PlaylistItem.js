import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

function PlaylistItem(props){

	return(
		<div className="item">
			<Link to={`/playlist/${props.data.id}`}>
				<div className="img" style={{backgroundImage: `url('${props.data.image}')`}}>
					<button><FaPlay /></button>
				</div>
			</Link>
			<h1>{props.data.name}</h1>
		</div>
	)
}

export default PlaylistItem;