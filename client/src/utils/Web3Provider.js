import React, { Component } from 'react';
import EventFactoryContract from '../contracts/EventFactory.json';
import getWeb3 from './getWeb3';
import { Web3Context } from './context';

export default class Web3Provider extends Component {
	state = { web3: null, accounts: null, contract: null };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = EventFactoryContract.networks[networkId];
			const instance = new web3.eth.Contract(
				EventFactoryContract.abi,
				deployedNetwork && deployedNetwork.address
			);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
	};
	render() {
		if (this.state.web3 != null) {
			return <Web3Context.Provider value={this.state}>{this.props.children}</Web3Context.Provider>;
		} else {
			return <h1>loading web3...</h1>;
		}
	}
}
