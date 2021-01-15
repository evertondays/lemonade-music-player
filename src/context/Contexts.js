import React from 'react';

import MediaProvider from './MediaContext';
import PlayerProvider from './PlayerContext';
import PlaylistProvider from './PlaylistContext';

function Contexts(props){
	return(
		<MediaProvider>
			<PlaylistProvider>
				<PlayerProvider>
					{props.children}
				</PlayerProvider>
			</PlaylistProvider>
		</MediaProvider>
	);
}

export default Contexts;