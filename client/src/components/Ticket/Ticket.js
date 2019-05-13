import React, { useState } from 'react';

import EventModal from '../Event/EventModal';
import TicketRow from './TicketTableRow';

const Ticket = ({ ticket, buyTicket, sellTicket }) => {
	const [ modalOpen, setModalOpen ] = useState(false);

	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);

	return (
		<React.Fragment>
			<TicketRow handleOpen={handleOpen} ticket={ticket} sellTicket={sellTicket} />
			<EventModal
				event={ticket.event}
				modalOpen={modalOpen}
				handleOpen={handleOpen}
				handleClose={handleClose}
				buyTicket={buyTicket}
			/>
		</React.Fragment>
	);
};

export default Ticket;
