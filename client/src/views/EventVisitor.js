import React, { useContext } from 'react';
import { Web3Context } from '../utils/context';

export default function EventVisitor() {
	const state = useContext(Web3Context);
	return (
		<div>
			<h1>EventVisitor</h1>
			<h1>{state.accounts[0]}</h1>
		</div>
	);
}
