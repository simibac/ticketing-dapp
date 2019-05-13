import React from 'react';
import { Button } from 'semantic-ui-react';

const AddEventButton = ({ handleOpen }) => {
	const addButtonStyle = {
		position: 'fixed',
		bottom: '20px',
		right: '20px'
	};
	return <Button circular color="blue" size="massive" style={addButtonStyle} icon="plus" onClick={handleOpen} />;
};

export default AddEventButton;
