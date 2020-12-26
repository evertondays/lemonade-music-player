import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

// Assets
import PlayingGif from '../assets/images/equalizer-2.gif';

// Contexts
import { usePlayer } from '../context/PlayerContext';
import { useMedia } from '../context/MediaContext';

function ListItem(props) {
	const { player } = usePlayer();
	const { media, setMedia } = useMedia();

	const [isThisSong, setIsThisSong] = useState(false);

	function changeMusic() {
		const newMusic = {
			...props.music,
			file: `http://localhost:3333/song/${props.music.file}`
		}

		setMedia(newMusic);
	}

	const [duration, setDuration] = useState('?:??');

	useEffect(() => {
		if (media.name === props.music.name && media.artist === props.music.artist
			&& media.album === props.music.album)
		{
			setIsThisSong(true);
		} else {
			setIsThisSong(false);
		}
	}, [media]);

	return (
		<tr className="list-item">
			<th className="index-th">
				<button onClick={changeMusic} className="btn-play">
					{
						isThisSong ?
							(
								<div className="is-this-song">
									{
										player.playing ?
										(
											<>
												<img className="equalizer-gif not-hover" src={PlayingGif} />

												<div className="hover">
													<FaPause size={15} />
												</div>
											</>
										)
										: (
											<>
												<FaPause className="not-hover" size={15} />

												<div className="hover">
													<FaPlay size={15} />
												</div>
											</>
										)
									}
								</div>
							)
							: (
								<div className="not-this-song">
									<div className="id not-hover">{props.id}</div>

									<div className="hover">
										<FaPlay size={15} />
									</div>
								</div>)
					}
				</button>
			</th>
			<th>{props.music.name}</th>
			<th className="artist-th">{props.music.artist}</th>
			<th className="album-th">{props.music.album}</th>
			<th className="duration-th">{duration}</th>
		</tr>
	);
}

export default ListItem;