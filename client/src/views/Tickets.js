import React, { useEffect, useState, useContext } from 'react';
import { Web3Context } from '../utils/context';
import TicketTable from '../components/Ticket/TicketTable';

export default function Tickets() {
	const [ tickets, setTickets ] = useState([]);

	const { accounts, contract } = useContext(Web3Context);

	const fetchNumberEvents = async () => {
		return await contract.methods.eventIndex().call();
	};

	const fetchEvent = async (id) => {
		return await contract.methods.events(id).call();
	};

	const fetchTicketOwner = async (eventId, ticketId) => {
		return await contract.methods.getTicketOwner(eventId, ticketId).call();
	};

	const fetchAllMyTickets = async () => {
		const num = await fetchNumberEvents();
		const events = [];
		const tickets = [];
		for (let i = 0; i < num; i++) {
			const event = await fetchEvent(i);
			for (let j = 0; j < event.ticketIndex; j++) {
				const ticketOwner = await fetchTicketOwner(i, j);
				if (ticketOwner === accounts[0]) {
					tickets.push({ owner: ticketOwner, eventId: i, ticketId: j, event: event });
				}
			}
			events.push(event);
		}
		setTickets(tickets);
	};

	const buyTicket = async (eventId, ticketPriceETH) => {
		await contract.methods.buyTicket(eventId).send({ from: accounts[0], value: ticketPriceETH }).catch((err) => {
			console.log(err);
			return err;
		});
	};

	const sellTicket = async (eventId, ticketId) => {
		await contract.methods.sellTicket(eventId, ticketId).send({ from: accounts[0] }).catch((err) => {
			console.log(err);
			return err;
		});
	};

	useEffect(() => {
		fetchAllMyTickets();
	}, []);

	return (
		<div className="page-container">
			<h1>Tickets Page</h1>
			<TicketTable tickets={tickets} buyTicket={buyTicket} sellTicket={sellTicket} />
		</div>
	);
}
