import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import Ticket from './Ticket';

export default function TicketTable({ buyTicket, tickets, sellTicket }) {
	return (
		<Table singleLine>
			<Table.Header>
				<Table.Row textAlign="center">
					<Table.HeaderCell>Event Name</Table.HeaderCell>
					<Table.HeaderCell>Date</Table.HeaderCell>
					<Table.HeaderCell>Ticket Id</Table.HeaderCell>
					<Table.HeaderCell>Ticket Price</Table.HeaderCell>
					<Table.HeaderCell>Actions</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{tickets.map((ticket) => {
					return (
						<Ticket
							ticket={ticket}
							buyTicket={buyTicket}
							sellTicket={sellTicket}
							key={'' + ticket.eventId + ticket.ticketId}
						/>
					);
				})}
			</Table.Body>

			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell colSpan="6">
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
