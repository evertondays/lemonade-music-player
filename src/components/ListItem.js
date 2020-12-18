import React from 'react';

function Home(props){
	return(
		<button>{props.music.name}</button>
	);
}

export default Home;