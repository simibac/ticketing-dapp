import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function Event(event) {
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
	} = event.event;

	const dateString = new Date(parseInt(date) * 1000).toDateString();

	return (
		<Card centered>
			<Image
				src="https://thumbs.dreamstime.com/z/rock-band-stage-people-concert-music-performance-vector-illustration-cartoon-style-98380368.jpg"
				wrapped
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Card.Meta>
					<span className="date">Ticket Price: {ticketPrice}</span>
				</Card.Meta>
				<Card.Description>
					<p>Owner: {owner.slice(0, 20)}...</p>
					<p>Event ID: {eventId}</p>
					<p>Number of Tickets: {numTickets}</p>
					<p>Tickets Sold: {ticketIndex}</p>
					<p>People in Selling Queue: {sellingQueueHead - sellingQueueTail}</p>
					<p>People in Buying Queue: {buyingQueueHead - buyingQueueTail}</p>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<a>{dateString}</a>
			</Card.Content>
		</Card>
	);
}
