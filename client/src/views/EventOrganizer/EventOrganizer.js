import React, { useState } from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import CreateEventForm from '../../components/CreateEventForm';

export default function EventOrganizer() {
	const [ modalOpen, setModalOpen ] = useState(false);

	const handleOpen = () => setModalOpen(true);

	const handleClose = () => setModalOpen(false);

	return (
		<div>
			<h1>Event Organizer Page</h1>
			<Modal
				trigger={<AddEventButton handleOpen={handleOpen} />}
				open={modalOpen}
				onClose={handleClose}
				size="small"
			>
				<Header icon="browser" content="Create New Event" />
				<Modal.Content>
					<CreateEventForm />
				</Modal.Content>
			</Modal>
		</div>
	);
}

function AddEventButton({ handleOpen }) {
	const addButtonStyle = {
		position: 'absolute',
		bottom: 20,
		right: 20
	};
	return <Button circular color="blue" size="massive" style={addButtonStyle} icon="plus" onClick={handleOpen} />;
}
