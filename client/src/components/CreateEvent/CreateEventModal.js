import React from 'react';
import { Modal, Header } from 'semantic-ui-react';
import CreateEventForm from './CreateEventForm';

export default function CreateEventModal({ modalOpen, handleClose, createEvent }) {
	return (
		<Modal open={modalOpen} onClose={handleClose}>
			<Header icon="browser" content="Create Event" />
			<Modal.Content>
				<CreateEventForm handleClose={handleClose} createEvent={createEvent} />
			</Modal.Content>
		</Modal>
	);
}
