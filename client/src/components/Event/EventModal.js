import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const Event = ({ event, modalOpen, handleClose, buyTicket }) => {
	const handleClick = () => {
		buyTicket(event.eventId, event.ticketPrice);
	};

	return (
		<Modal open={modalOpen} onClose={handleClose}>
			<Modal.Header>Event Details</Modal.Header>
			<Modal.Content>
				<EventDetails event={event} />
			</Modal.Content>
			<Modal.Actions>
				<Button color="green" onClick={handleClick}>
					BuyTicket
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

const EventDetails = ({ event }) => {
	const {
		owner,
		eventId,
		name,
		date,
		numTickets,
		ticketPrice,
		ticketIndex,
		sellingQueueHead,
		sellingQueueTail,
		buyingQueueHead,
		buyingQueueTail
	} = event;

	const dateString = new Date(parseInt(date) * 1000).toDateString();

	return (
		<React.Fragment>
			<h1>{name}</h1>
			<p>Owner: {owner}</p>
			<p>Event ID: {eventId}</p>
			<p>Date: {dateString}</p>
			<p>Ticket Price: {ticketPrice}</p>
			<p>Number of Tickets: {numTickets}</p>
			<p>Tickets Sold: {ticketIndex}</p>
			<p>People in Selling Queue: {Math.abs(sellingQueueHead - sellingQueueTail)}</p>
			<p>People in Buying Queue: {Math.abs(buyingQueueHead - buyingQueueTail)}</p>
		</React.Fragment>
	);
};

export default Event;
