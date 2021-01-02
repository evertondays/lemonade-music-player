import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

// Style
import '../css/components/navbar.css';

function Navbar(){
	return(
		<nav>
			<div className="left">
			<Link to={'/'}><h1 className="page-tile">Lemonade</h1></Link>
			</div>
			<div className="right">
				<Link to={'/register-music'} className="btn-import-music"><FaPlusCircle className="icon" />Adicionar musica</Link>
			</div>
		</nav>
	);
}

export default Navbar;