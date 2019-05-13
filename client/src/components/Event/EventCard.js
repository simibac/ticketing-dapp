import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const EventCard = ({ event, handleOpen }) => {
	const { owner, name, date, numTickets, ticketPrice, ticketIndex } = event;

	const dateString = new Date(parseInt(date) * 1000).toDateString();

	return (
		<Card centered onClick={handleOpen}>
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
					<p>Number of Tickets: {numTickets}</p>
					<p>Tickets Sold: {ticketIndex}</p>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<p>{dateString}</p>
			</Card.Content>
		</Card>
	);
};

export default EventCard;
