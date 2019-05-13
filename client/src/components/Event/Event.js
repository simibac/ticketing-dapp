import React, { useState } from 'react';
import EventModal from './EventModal';
import EventCard from './EventCard';

const Event = ({ event, buyTicket }) => {
	const [ modalOpen, setModalOpen ] = useState(false);

	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);

	return (
		<React.Fragment>
			<EventCard event={event} handleOpen={handleOpen} />
			<EventModal
				event={event}
				modalOpen={modalOpen}
				handleOpen={handleOpen}
				handleClose={handleClose}
				buyTicket={buyTicket}
			/>
		</React.Fragment>
	);
};

export default Event;
