import React, { useState, useEffect, useContext } from 'react';
import { Button, Header, Modal, Icon, Card } from 'semantic-ui-react';
import CreateEventForm from '../components/CreateEventForm';
import Event from '../components/Event';

import { Web3Context } from '../utils/context';

export default function EventOrganizer() {
	const { web3, accounts, contract } = useContext(Web3Context);

	const [ modalOpen, setModalOpen ] = useState(false);
	const [ events, setEvents ] = useState([]);

	const handleOpen = () => setModalOpen(true);

	const handleClose = () => setModalOpen(false);

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

	useEffect(() => {
		fetchAllEvents(3);
	}, []);

	return (
		<div>
			<h1>Event Organizer Page</h1>
			<Card.Group>{events.map((event) => <Event event={event} key={event.eventId} />)}</Card.Group>
			<Modal
				trigger={<AddEventButton handleOpen={handleOpen} />}
				open={modalOpen}
				onClose={handleClose}
				size="small"
			>
				<Header icon="browser" content="Create New Event" />
				<Modal.Content>
					<CreateEventForm handleClose={handleClose} />
				</Modal.Content>
			</Modal>
		</div>
	);
}

function AddEventButton({ handleOpen }) {
	const addButtonStyle = {
		position: 'fixed',
		bottom: '20px',
		right: '20px'
	};
	return <Button circular color="blue" size="massive" style={addButtonStyle} icon="plus" onClick={handleOpen} />;
}
