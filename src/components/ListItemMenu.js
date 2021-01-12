import React from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

// Styles
import '../css/components/sub-menu-item.css';

function ListItemMenu(props){
	
	function deleteItem(){
		var options = {method: 'DELETE', url: `http://localhost:3333/music/${props.id}`};

		axios.request(options)
			.then(async function (response) {
				let responseData = await response.data;
				console.log(responseData)

				window.location.href='http://localhost:3000/';
			}).catch(function (error) {
				console.error(error);
			});
	}

	return(
		<div className="sub-menu">
			<div className="item"><FaTrashAlt className="icon" /> Excluir</div>
			<div onClick={deleteItem} className="delete item"><FaTrashAlt className="icon" /> Excluir</div>
		</div>
	);
}

export default ListItemMenu;