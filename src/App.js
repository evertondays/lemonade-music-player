import React from 'react';

import Routes from './routes';
import Contexts from './context/Contexts';

import './css/global.css';

function App() {	
	return (
		<>
			<Contexts>
				<Routes />
			</Contexts>
		</>
	);
}

export default App;