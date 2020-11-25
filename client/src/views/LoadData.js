import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoadData() {
	// Declare a new state variable, which we'll call "count"
	const [loadedData, setLoadedData] = useState(null);

	useEffect(() => {
		// Fetch the data on load
		axios.get('http://localhost:3001/loaddata', {}).then((response) => {
			setLoadedData(response);
		});
	}, []);

	return (
		<div>
			<h1>Load Data</h1>
			<p>{loadedData}</p>
		</div>
	);
}

export default LoadData;
