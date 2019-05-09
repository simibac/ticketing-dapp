import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EventVisitor from '../views/EventVisitor';
import EventOrganizer from '../views/EventOrganizer';
import { Button, Sticky } from 'semantic-ui-react';

export default function PageSwitcher() {
	const [ activePath, setActivePath ] = useState('/');

	const handleClick = () => {
		activePath === '/' ? setActivePath('organizer') : setActivePath('/');
	};
	const buttonStyle = {
		position: 'fixed',
		top: '20px',
		right: '20px',
		zIndex: '99'
	};

	return (
		<Router>
			{activePath === '/' && (
				<Link to="/organizer/">
					<Button size="big" color="red" style={buttonStyle} onClick={handleClick}>
						Change View For Event Organizers
					</Button>
				</Link>
			)}
			{activePath === 'organizer' && (
				<Link to="/">
					<Button size="big" color="red" style={buttonStyle} onClick={handleClick}>
						Change View For Event Visitors
					</Button>
				</Link>
			)}
			<Route path="/" exact component={EventVisitor} />
			<Route path="/organizer/" component={EventOrganizer} />
		</Router>
	);
}
