import React, { Component } from 'react';

import HeaderBar from './components/HeaderBar';
import Web3Provider from './utils/Web3Provider';

class App extends Component {
	render() {
		return (
			<Web3Provider>
				<HeaderBar />
			</Web3Provider>
		);
	}
}

export default App;
