import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import '../css/form.css'

function RegisterMusic(){
	let history = useHistory();
	const form = useRef(null);

	function handleSubmit(){
		var formData = new FormData(form.current);

		axios.post('http://192.168.1.191:3333/music/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(async (response) => {
			await response;
			
			history.push('/');
		})

		
	}

	return(
		<div className="page-container">
			<form ref={form} className="register" action="http://192.168.1.191:3333/music/">
				<h1>Cadastre uma nova música</h1>

				<div className="form-group">
					<label>Música (arquivo):</label>
					<input name="file" type="file" accept="audio/mp3" require />
				</div>

				<div className="form-group">
					<label>Nome:</label>
					<input name="name" type="text" require />
				</div>

				<div className="form-group">
					<label>Artista:</label>
					<input name="artist" type="text" require />
				</div>

				<div className="form-group">
					<label>Álbum:</label>
					<input name="album" type="text" require />
				</div>

				<div className="form-group">
					<label>Imagem (link):</label>
					<input name="image" type="text" require />
				</div>

				<button type="button" onClick={handleSubmit} className="btn-create">Adicionar musica</button>
			</form>
		</div>
	);
}

export default RegisterMusic;