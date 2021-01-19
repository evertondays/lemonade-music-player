import React, { useRef, useState, useEffect } from 'react';
import 
	{ 
		FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaStepForward, FaStepBackward, FaInfoCircle,
		FaTimes
	} 
from 'react-icons/fa';

// Contexts
import { usePlayer } from '../context/PlayerContext';
import { useMedia } from '../context/MediaContext';
import { usePlaylist } from '../context/PlaylistContext';

// Utils
import convertSegMin from '../utils/convertSegMin';

// Styles
import '../css/components/player.css';
import '../css/range.css';

function Player() {
	const audio = useRef(null);
	const sourceAudio = useRef(null);

	const { media, setMedia } = useMedia();
	const {player, setPlayer} = usePlayer();
	const { playlist, setPlaylist } = usePlaylist();

	const [playerTime, setPlayerTime] = useState({
		time: 0,
		timeInSeconds: '0:00'
	});

	const [infoShow, setInfoShow] = useState(false);
	const [volumeShow, setVolumeShow] = useState(false);

	// Media effect
	useEffect(() => {
		if(audio.current.src === media.file){
			togglePlay();
			return;
		}

		// Verificando se o media não está esperando a resposta da API
		if(media.file === '?'){
			return;
		}

		if(!player.firstMusic){
			audio.current.src = media.file;

			if(player.playing === false){
				togglePlay();
			}

			audio.current.play();
		} else {
			setPlayer({...player, firstMusic: false})
		}
	},[media]);

	// Playing effect
	useEffect(() => {
		if (player.playing){
			audio.current.play();
		} else {
			audio.current.pause();
		}
	},[player.playing]);

	// Volume effect
	useEffect(() => {
		audio.current.volume = player.volume;
		localStorage.setItem('volume', player.volume);
	},[player.volume]);

	// Muted effect
	useEffect(() => {
		audio.current.muted = player.muted;
	},[player.muted]);

	// ***********************************
	// Funções de controle da tag de audio
	// ***********************************
	function togglePlay(){
		let playing = !player.playing;
		setPlayer({...player, playing});
	}

	function updateTime(){
		if(!isNaN(audio.current.duration)){
			let time = audio.current.currentTime / (audio.current.duration / 100);
			let timeInSeconds = convertSegMin(audio.current.currentTime);
	
			setPlayerTime({time, timeInSeconds});
		}

		// Trocando a música
		if(audio.current.ended){
			if(playlist.data.length === playlist.music + 1){
				setPlayer({...player, playing: false})
				alert('A playlist acabou!');
			} else {
				setMedia({
					...playlist.data[playlist.music + 1],
					file: `http://localhost:3333/song/${playlist.data[playlist.music + 1].file}`
				});

				setPlayer({...player, firstMusic: false});

				setPlayerTime({
					time: 0,
					timeInSeconds: '0:00'
				});
	
				setPlaylist({...playlist, music: playlist.music+1});
			}
		}
	}

	function userSetTime(event){
		let timeInSeconds = convertSegMin((audio.current.duration / 100) * event.target.value);
		setPlayerTime({...playerTime, timeInSeconds, time: event.target.value});

		audio.current.currentTime =  (audio.current.duration / 100) * event.target.value;
	}

	function userSetVolume(event){
		setPlayer({...player, volume: event.target.value});
	}

	function toggleMuted(){
		let muted = !player.muted;
		setPlayer({...player, muted});
	}

	function nextMusic(){
		if((playlist.music + 1) < playlist.data.length){
			setMedia({
				...playlist.data[playlist.music + 1],
				file: `http://localhost:3333/song/${playlist.data[playlist.music + 1].file}`
			});
	
			setPlayer({...player, firstMusic: false, playing: true});
	
			setPlayerTime({
				time: 0,
				timeInSeconds: '0:00'
			});
	
			setPlaylist({...playlist, music: playlist.music+1});
		}
	}

	function previewMusic(){
		if((playlist.music - 1) >= 0){
			setMedia({
				...playlist.data[playlist.music - 1],
				file: `http://localhost:3333/song/${playlist.data[playlist.music - 1].file}`
			});
	
			setPlayer({...player, firstMusic: false, playing: true});
	
			setPlayerTime({
				time: 0,
				timeInSeconds: '0:00'
			});
	
			setPlaylist({...playlist, music: playlist.music - 1});
		}
	}


	// **********************************************
	// Funções de exibição (para o layout responsivo)
	// **********************************************
	function showInfo(){
		let infos = document.querySelector('#player-container .infos');

		if (infoShow){
			infos.classList.add('invisible-important');
			infos.classList.remove('grid-display');
		} else {
			infos.classList.remove('invisible-important');
			infos.classList.add('grid-display');
		}

		setInfoShow(!infoShow);
	}

	function showVolume(){
		let volume = document.querySelector('#player-container .sound-volume-range');

		setPlayer({...player, muted: false})

		if (volumeShow){
			volume.classList.add('invisible-important');
			volume.classList.remove('inline-display');
		} else {
			volume.classList.remove('invisible-important');
			volume.classList.add('inline-display');

		}

		setVolumeShow(!volumeShow);
	}

	return (
		<section>
			<div className="name-info">{ media.name } - { media.artist }</div>
			<div id="player-container">
				{/* Informações PLUS */}
				<div className="infos-container">
					<button className="show-info-button" onClick={showInfo}><FaInfoCircle size={18} /></button>
					<div className="infos">
						<img src={media.image} alt={ media.album } />
						<div className="info-text">
							<h1>{ media.name }</h1>
							<h2>{ media.artist }</h2>
							<h3>{ media.album }</h3>
						</div>
					</div>
				</div>

				{/* Controles da musica */}
				<div className="controllers">
					<div className="buttons">
						<button onClick={previewMusic}><FaStepBackward size={30} /></button>
						<button className="btn-play" onClick={togglePlay}>
							{!player.playing ? 
								(<FaPlay size={35} />) 
								: (<FaPause size={35}  />)
							}
						</button>
						<button onClick={nextMusic}><FaStepForward size={30} /></button>
					</div>
					
					<div className="slider-container">
						<div className="time">{playerTime.timeInSeconds}</div>
						<input className="slider" id="music-range" 
								type="range" step={0.001}
								min={0} max={100} 
								value={playerTime.time} onChange={userSetTime}
								style={{background: `linear-gradient(90deg, rgb(0,232,143) ${playerTime.time}%, rgb(140,140,151) ${playerTime.time}%)`}}
						/>
						<div className="time">{convertSegMin(media.duration)}</div>
					</div>
				</div>
				
				{/* Controle de som */}
				<div className="sound-controllers">
					<input className="sound-volume-range slider"  id="range-sound"
							type="range" step={0.01}
							min={0} max={1}
							value={player.volume} onChange={userSetVolume}
							style={{background: `linear-gradient(90deg, rgb(0,232,143) ${player.volume * 100}%, rgb(140,140,151) ${player.volume * 100}%)`}}
					/>

					<button className="btn-muted" onClick={toggleMuted}>
						{player.muted ? 
							(<FaVolumeMute size={22} />) 
							: (<FaVolumeUp size={22} />)
						}
					</button>

					<button className="btn-show-volume-config" onClick={showVolume}>
						{volumeShow ? 
							(<FaTimes  size={20} />) 
							:(<FaVolumeUp size={20} />)
						}
					</button>
				</div>

				{/* audio tag */}
				<audio ref={audio} onTimeUpdate={updateTime}>
					<source ref={sourceAudio} src={media.file} type="audio/ogg" />
				</audio>
			</div>
		</section>
  );
}

export default Player;