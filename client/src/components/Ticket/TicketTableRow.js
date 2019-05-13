import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TicketRow({ ticket, handleOpen, sellTicket }) {
	const { name, ticketPrice, date } = ticket.event;
	const dateString = new Date(parseInt(date) * 1000).toDateString();
	const handleSellButton = () => {
		sellTicket(ticket.eventId, ticket.ticketId);
	};
	return (
		<React.Fragment>
			<Table.Row textAlign="center">
				<Table.Cell>{name}</Table.Cell>
				<Table.Cell>{dateString}</Table.Cell>
				<Table.Cell>{'' + ticket.eventId + ticket.ticketId}</Table.Cell>
				<Table.Cell>{ticketPrice}</Table.Cell>

				<Table.Cell>
					<Button color="green">Redeem</Button>
					<Button color="red" onClick={handleSellButton}>
						Sell
					</Button>
					<Button onClick={handleOpen}>Show Details</Button>
				</Table.Cell>
			</Table.Row>
		</React.Fragment>
	);
}
