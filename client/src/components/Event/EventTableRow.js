import React from 'react';
import { Table } from 'semantic-ui-react';

export default function EventTableRow({ event }) {
	const {
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
		<Table.Row textAlign="center">
			<Table.Cell>{name}</Table.Cell>
			<Table.Cell>{eventId}</Table.Cell>
			<Table.Cell>{dateString}</Table.Cell>
			<Table.Cell>{ticketPrice}</Table.Cell>
			<Table.Cell>{'' + ticketIndex + '/' + numTickets}</Table.Cell>
			<Table.Cell>{Math.abs(buyingQueueHead - buyingQueueTail)}</Table.Cell>
			<Table.Cell>{Math.abs(sellingQueueHead - sellingQueueTail)}</Table.Cell>
		</Table.Row>
	);
}
