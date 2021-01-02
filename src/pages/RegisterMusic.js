import React from 'react';

import '../css/form.css'

function RegisterMusic(){
	return(
		<div className="page-container">
			<form className="register-music" action="http://localhost:3333/music/"
				method="POST" enctype="multipart/form-data"
			>
				<h1>Cadastre uma nova música</h1>

				<div className="form-group">
					<label>Música (arquivo):</label>
					<input name="file" type="file" />
				</div>

				<div className="form-group">
					<label>Nome:</label>
					<input name="name" type="text"/>
				</div>

				<div className="form-group">
					<label>Artista:</label>
					<input name="artist" type="text" />
				</div>

				<div className="form-group">
					<label>Álbum:</label>
					<input name="album" type="text"/>
				</div>

				<div className="form-group">
					<label>Imagem (link):</label>
					<input name="image" type="text"/>
				</div>

				<button type="submit">Adicionar</button>
			</form>
		</div>
	);
}

export default RegisterMusic;