import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../utils/context';
import { Card } from 'semantic-ui-react';

import Event from '../components/Event/Event';

export default function EventVisitor() {
	const [ events, setEvents ] = useState([]);

	const { accounts, contract } = useContext(Web3Context);

	const fetchNumberEvents = async () => {
		return await contract.methods.eventIndex().call();
	};

	const fetchEvent = async (id) => {
		return await contract.methods.events(id).call();
	};

	const fetchAllEvents = async () => {
		const num = await fetchNumberEvents();
		const events = [];
		for (let i = 0; i < num; i++) {
			const event = await fetchEvent(i);
			events.push(event);
		}
		setEvents(events);
	};

	const buyTicket = async (eventId, ticketPriceETH) => {
		await contract.methods.buyTicket(eventId).send({ from: accounts[0], value: ticketPriceETH }).catch((err) => {
			console.log(err);
		});
	};

	useEffect(() => {
		fetchAllEvents();
	}, []);

	return (
		<div className="page-container">
			<Card.Group>
				{events.map((event) => <Event event={event} buyTicket={buyTicket} key={event.eventId} />)}
			</Card.Group>
		</div>
	);
}
