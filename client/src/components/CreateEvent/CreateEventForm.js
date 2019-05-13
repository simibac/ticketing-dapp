import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Dropdown, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateEventForm({ handleClose, createEvent }) {
	const [ name, setName ] = useState('');
	const [ website, setWebsite ] = useState('');
	const [ startDate, setStartDate ] = useState(Math.floor(new Date().getTime() / 1000));
	const [ ticketPrice, setTicketPrice ] = useState('');
	const [ numberTickets, setNumberTickets ] = useState('');

	const [ showTicketPriceError, setShowTicketPriceError ] = useState(false);
	const [ showNumberTicketsError, setShowNumberTicketsError ] = useState(false);
	const [ showWeb3Error, setShowWeb3Error ] = useState(false);
	const [ formCompleted, setFormCompleted ] = useState(false);

	const priceOptions = [
		{ key: 'ETH', text: 'ETH', value: 'ETH' },
		{ key: 'USD', text: 'USD', value: 'USD' },
		{ key: 'EUR', text: 'EUR', value: 'EUR' },
		{ key: 'CHF', text: 'CHF', value: 'CHF' }
	];

	const handleTicketPrice = (e) => {
		if (isNaN(e.target.value)) {
			setShowTicketPriceError(true);
		} else {
			setTicketPrice(e.target.value);
			setShowTicketPriceError(false);
		}
	};

	const handleNumberTickets = (e) => {
		if (isNaN(e.target.value)) {
			setShowNumberTicketsError(true);
		} else {
			setNumberTickets(e.target.value);
			setShowNumberTicketsError(false);
		}
	};

	const handleSubmit = async () => {
		// TODO check inputs for validity
		setFormCompleted(true);

		const error = await createEvent(name, startDate, numberTickets, ticketPrice);

		if (error != null) {
			setShowWeb3Error(true);
		}

		// this is necessary to make sure useEffect fires. if the state is the same it will not update and thus, not call useEffect
		setShowWeb3Error(true);
		setShowWeb3Error(false);
	};

	useEffect(
		() => {
			if (!showWeb3Error && formCompleted) {
				handleClose();
			}
		},
		[ showWeb3Error ]
	);

	return (
		<Form error>
			<Form.Field>
				<label>Event Name</label>
				<input value={name} placeholder="Event Name" onChange={(e) => setName(e.target.value)} />
			</Form.Field>
			<Form.Field>
				<label>Website</label>
				<Input
					value={website}
					label="http://"
					placeholder="event-site.com"
					onChange={(e) => setWebsite(e.target.value)}
				/>
			</Form.Field>
			<Form.Field>
				<label>Start Date</label>
				<DatePicker
					inline
					selected={new Date(startDate * 1000)}
					onChange={(date) => setStartDate(date.getTime() / 1000)}
					showTimeSelect
					timeFormat="HH:mm"
					timeIntervals={15}
					dateFormat="MMMM d, yyyy h:mm aa"
					timeCaption="time"
				/>
			</Form.Field>
			<Form.Field>
				<label>Number of Tickets</label>
				<Input
					label={{ basic: true, content: 'Tickets' }}
					labelPosition="right"
					placeholder="Number of Tickets"
					value={numberTickets}
					onChange={handleNumberTickets}
				/>
				{showNumberTicketsError && <NumbericError />}
			</Form.Field>
			<Form.Field>
				<label>Ticket Price</label>
				<Input
					label={<Dropdown defaultValue="ETH" options={priceOptions} />}
					labelPosition="right"
					placeholder="Price"
					value={ticketPrice}
					onChange={handleTicketPrice}
				/>
				{showTicketPriceError && <NumbericError />}
			</Form.Field>
			{showWeb3Error && <Web3Error />}
			<Button type="Publish" onClick={handleSubmit}>
				Submit
			</Button>
		</Form>
	);
}

const NumbericError = () => {
	return <Message error header="Invalid Input" content="The input must be numeric." />;
};

// const EmptyError = () => {
// 	return <Message error header="Input Required" content="The input cannot be empty." />;
// };

const Web3Error = () => {
	return <Message error header="Web3 Error" content="There was an error with metamask" />;
};
