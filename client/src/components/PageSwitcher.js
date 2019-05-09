import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EventVisitor from '../views/EventVisitor/EventVisitor';
import EventOrganizer from '../views/EventOrganizer/EventOrganizer';
import { Button } from 'semantic-ui-react';

export default function PageSwitcher() {
	const [ activePath, setActivePath ] = useState('/');

	const handleClick = () => {
		activePath === '/' ? setActivePath('organizer') : setActivePath('/');
	};
	const buttonStyle = {
		position: 'absolute',
		top: 20,
		right: 20
	};
	return (
		<Router>
			{activePath === '/' && (
				<Link to="/organizer/">
					<Button size="big" color="red" style={buttonStyle} onClick={handleClick}>
						For Event Organizers
					</Button>
				</Link>
			)}
			{activePath === 'organizer' && (
				<Link to="/">
					<Button size="big" color="red" style={buttonStyle} onClick={handleClick}>
						For Event Visitors
					</Button>
				</Link>
			)}
			<Route path="/" exact component={EventVisitor} />
			<Route path="/organizer/" component={EventOrganizer} />
		</Router>
	);
}
