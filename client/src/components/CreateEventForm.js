import React, { useState } from 'react';
import { Button, Form, Input, Dropdown, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateEventForm({ web3 }) {
	const [ name, setName ] = useState('');
	const [ website, setWebsite ] = useState('');
	const [ startDate, setStartDate ] = useState(new Date());
	const [ ticketPrice, setTicketPrice ] = useState(null);
	const [ showTicketPriceError, setShowTicketPriceError ] = useState(false);
	const [ numberTickets, setNumberTickets ] = useState(null);
	const [ showNumberTicketsError, setShowNumberTicketsError ] = useState(false);

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

	const handleSubmit = () => {
		// TODO check if all inputs are not empty
	};

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
					selected={startDate}
					onChange={(date) => setStartDate(date)}
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
			<Button type="Publish" onClick={handleSubmit}>
				Submit
			</Button>
		</Form>
	);
}

const NumbericError = () => {
	return <Message error header="Invalid Input" content="The input must be numeric." />;
};

const EmptyError = () => {
	return <Message error header="Input Required" content="The input cannot be empty." />;
};
