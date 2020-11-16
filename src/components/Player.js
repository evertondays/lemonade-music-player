import React, { useRef, useState, useEffect } from 'react';
import 
	{ 
		FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaArrowRight, FaArrowLeft, FaInfoCircle,
		FaTimes
	} 
from 'react-icons/fa';

import '../css/components/player.css';
import '../css/range.css';

import ImgTest from '../assets/images/índice.jpeg';

function Player() {

	function convertSegMin(seg){
		seg = seg.toFixed(0);
	
		var min = (seg / 60);
		min = Math.floor(min);
	
		var res = seg % 60;
		if (res < 10) {
			res = "0" + res;
		}
	
		return `${min}:${res}`;
	}

	const audio = useRef(null);

	const [player, setPlayer] = useState({
		playing: false,
		time: 0,
		timeInSeconds: '0:00',
		totalTimeInSeconds: '-:--',
		volume: 0.75,
		muted: false,
	});

	const [media, setMedia] = useState('https://nerdcast-cdn.jovemnerd.com.br/nerdcast_747_the_boys_2_explodindo_cabecas.mp3');
	useEffect(() => {
		let totalTimeInSeconds = convertSegMin(audio.current.duration);
		setPlayer({...player, totalTimeInSeconds});
	},[media.playing]);

	const [infoShow, setInfoShow] = useState(false);
	const [volumeShow, setVolumeShow] = useState(false);

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
	},[player.volume]);

	// Muted effect
	useEffect(() => {
		audio.current.muted = player.muted;
	},[player.muted]);

	function togglePlay(){
		let playing = !player.playing;
		setPlayer({...player, playing});
	}

	function updateTime(){
		let time = audio.current.currentTime / (audio.current.duration / 100);
		let timeInSeconds = convertSegMin(audio.current.currentTime);

		setPlayer({...player, time, timeInSeconds});
	}

	function userSetTime(event){
		setPlayer({...player, time: event.target.value});
		audio.current.currentTime =  (audio.current.duration / 100) * event.target.value;

	}

	function userSetVolume(event){
		setPlayer({...player, volume: event.target.value});
	}

	function toggleMuted(){
		let muted = !player.muted;
		setPlayer({...player, muted});
	}

	// Funções de exibição (paro o layout responsivo)
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
		<>
			<div className="name-info">Nothing Else Matters - Metallica</div>
			<div id="player-container">
				{/* Informações PLUS */}
				<div className="infos-container">
					<button className="show-info-button" onClick={showInfo}><FaInfoCircle size={18} /></button>
					<div className="infos">
						<img src={ImgTest} alt="The Black Album" />
						<div className="info-text">
							<h1>Nothing Else Matters</h1>
							<h2>Metallica</h2>
							<h3>The Black Album</h3>
						</div>
					</div>
				</div>

				{/* Controles da musica */}
				<div className="controllers">
					<div className="buttons">
						<button><FaArrowLeft size={28} /></button>
						<button className="btn-play" onClick={togglePlay}>
							{!player.playing ? 
								(<FaPlay size={35} />) 
								: (<FaPause size={35}  />)
							}
						</button>
						<button><FaArrowRight size={28} /></button>
					</div>
					
					<div className="slider-container">
						<div className="time">{player.timeInSeconds}</div>
						<input className="slider" id="music-range" 
								type="range" step={0.1}
								min={0} max={100} 
								value={player.time} onChange={userSetTime}
								style={{background: `linear-gradient(90deg, rgb(0,232,143) ${player.time}%, rgb(140,140,151) ${player.time}%)`}}
						/>
						<div className="time">{player.totalTimeInSeconds}</div>
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
					<source src={media} type="audio/ogg" />
				</audio>
			</div>
		</>
  );
}

export default Player;