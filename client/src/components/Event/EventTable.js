import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import EventTableRow from './EventTableRow';

export default function EventTable({ events }) {
	return (
		<Table singleLine>
			<Table.Header>
				<Table.Row textAlign="center">
					<Table.HeaderCell>Event Name</Table.HeaderCell>
					<Table.HeaderCell>Event ID</Table.HeaderCell>
					<Table.HeaderCell>Date</Table.HeaderCell>
					<Table.HeaderCell>Ticket Price</Table.HeaderCell>
					<Table.HeaderCell>Tickets Sold</Table.HeaderCell>
					<Table.HeaderCell>People in Buying Queue</Table.HeaderCell>
					<Table.HeaderCell>People in Selling Queue</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{events.map((event) => {
					return <EventTableRow event={event} key={event.eventId} />;
				})}
			</Table.Body>

			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell colSpan="7">
						<Menu floated="right" pagination>
							<Menu.Item as="a" icon>
								<Icon name="chevron left" />
							</Menu.Item>
							<Menu.Item as="a">1</Menu.Item>
							<Menu.Item as="a" icon>
								<Icon name="chevron right" />
							</Menu.Item>
						</Menu>
					</Table.HeaderCell>
				</Table.Row>
			</Table.Footer>
		</Table>
	);
}
