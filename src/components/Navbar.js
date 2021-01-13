import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaMusic } from 'react-icons/fa';

// Style
import '../css/components/navbar.css';

function Navbar(){
	return(
		<nav>
			<div className="left">
			<Link to={'/'}><h1 className="page-tile">Lemonade</h1></Link>
			</div>
			<div className="right">
				<Link to="/playlists">
					<div className="btn-playlists"><FaMusic className="icon" />Playlists</div>
				</Link>
				<Link to={'/register-music'} className="btn-import-music"><FaPlusCircle className="icon" />Adicionar musica</Link>
			</div>
		</nav>
	);
}

export default Navbar;