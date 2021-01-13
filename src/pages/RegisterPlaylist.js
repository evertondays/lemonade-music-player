import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import '../css/form.css';

function RegisterPlaylist(){

	const history = useHistory();

	const name = useRef('');
	const description = useRef('');
	const image = useRef('');

	function handleSubmit(){
		let data = {
			'name': name.current.value ,
			'description': description.current.value,
			'image': image.current.value
		};

		axios.post('http://localhost:3333/playlist/create', data)
			.then(async (response) => {
				await response;

				history.push('/playlists');
			}).catch((error) => {
				console.log(error)
			})
	}

	return(
		<div className="page-container">
			<form className="register">
				<div className="form-group">
					<label>Nome:</label>
					<input ref={name} name="name" type="text" require />
				</div>
				<div className="form-group">
					<label>Descrição:</label>
					<textarea ref={description} name="description" rows="6" require></textarea>
				</div>
				<div className="form-group">
					<label>Imagem (url):</label>
					<input ref={image} name="image" type="text" require />
				</div>

				<button className="btn-create" type="button" onClick={handleSubmit}>Criar playlist</button>
			</form>
		</div>
	);
}

export default RegisterPlaylist;