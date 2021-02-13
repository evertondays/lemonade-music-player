import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import PlayingGif from '../assets/images/equalizer-2.gif';

// Contexts
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';

function PlaylistItem(props){

	const {playlist} = usePlaylist();
	const {player} = usePlayer();

	return(
		<div className="item">
			<Link to={`/playlist/${props.data.id}`} className="img" style={{backgroundImage: `url('${props.data.image}')`}}>			
					{
						(props.data.id === parseFloat(playlist.playlistId) && player.playing === true) 
							? <div className="info-playing"><img src={PlayingGif} alt='Play gif' class="playlist-gif" /></div>
							: ''
					}
			</Link>
			<h1>{props.data.name}</h1>
		</div>
	)
}

export default PlaylistItem;