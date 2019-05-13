import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Menu, Dropdown, Input } from 'semantic-ui-react';

import Tickets from '../views/Tickets';
import Home from '../views/Home';
import EventOrganizer from '../views/EventOrganizer';

export default function PageSwitcher() {
	const [ activeItem, setActiveItem ] = useState('events');

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const headerStyle = {
		position: 'fixed',
		top: '20px',
		right: '20px',
		left: '20px',
		zIndex: '99'
	};

	return (
		<Router>
			<Menu size="large" style={headerStyle}>
				<Menu.Item as={Link} to="/home" name="home" active={activeItem === 'home'} onClick={handleItemClick} />
				<Menu.Item
					as={Link}
					to="/tickets"
					name="tickets"
					active={activeItem === 'tickets'}
					onClick={handleItemClick}
				/>
				<Menu.Item
					as={Link}
					to="/event-organizer"
					name="event-organizer"
					active={activeItem === 'event-organizer'}
					onClick={handleItemClick}
				/>

				<Menu.Menu position="right">
					<Input
						style={{ margin: '10px', width: '100%' }}
						placeholder="Search for Events, Artists or Genres"
					/>
					<Dropdown item text="WHEN">
						<Dropdown.Menu>
							<Dropdown.Item>Today</Dropdown.Item>
							<Dropdown.Item>Tomorrow</Dropdown.Item>
							<Dropdown.Item>
								<Input placeholder="Date" />
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown item text="WHERE">
						<Dropdown.Menu>
							<Dropdown.Item>Zurich</Dropdown.Item>
							<Dropdown.Item>Basel</Dropdown.Item>
							<Dropdown.Item>Berne</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Button primary style={{ margin: '10px' }}>
						Search
					</Button>
				</Menu.Menu>
			</Menu>

			<Route path="/" exact component={Home} />
			<Route path="/home/" component={Home} />
			<Route path="/event-organizer/" exact component={EventOrganizer} />
			<Route path="/tickets/" component={Tickets} />
		</Router>
	);
}
