import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../utils/context';

import EventTable from '../components/Event/EventTable';
import CreateEventModal from '../components/CreateEvent/CreateEventModal';
import AddEventButton from '../components/CreateEvent/AddEventButton';

export default function EventOrganizer() {
	const { accounts, contract } = useContext(Web3Context);
	const [ myEvents, setMyEvents ] = useState([]);

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);

	const fetchNumberEvents = async () => {
		return await contract.methods.eventIndex().call();
	};

	const fetchEvent = async (id) => {
		return await contract.methods.events(id).call();
	};

	const fetchMyEvents = async (address) => {
		const num = await fetchNumberEvents();
		const myEvents = [];
		for (let i = 0; i < num; i++) {
			const event = await fetchEvent(i);
			if (event.owner === address) {
				myEvents.push(event);
			}
		}
		setMyEvents(myEvents);
	};

	const createEvent = async (name, startDate, numberTickets, ticketPrice) => {
		await contract.methods
			.createEvent(name, startDate, numberTickets, ticketPrice)
			.send({ from: accounts[0] })
			.catch((err) => {
				console.log(err);
				return err;
			});
	};

	useEffect(() => {
		fetchMyEvents(accounts[0]);
	}, []);

	return (
		<div className="page-container">
			<h1>Event Organizer Page</h1>
			<EventTable events={myEvents} />
			<CreateEventModal handleClose={handleClose} createEvent={createEvent} modalOpen={modalOpen} />
			<AddEventButton handleOpen={handleOpen} />
		</div>
	);
}
