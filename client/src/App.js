import React, { Component } from 'react';

import PageSwitcher from './components/PageSwitcher';
import Web3Provider from './utils/Web3Provider';

class App extends Component {
	render() {
		return (
			<Web3Provider>
				<PageSwitcher />
			</Web3Provider>
		);
	}
}

export default App;
