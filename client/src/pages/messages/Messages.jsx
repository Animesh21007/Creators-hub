import React from 'react';
import './Messages.scss';
import { Link } from 'react-router-dom';

const Messages = () => {
	const curruser = {
		id: 1,
		username: 'John Doe',
		isSeller: true,
	};

	const message =
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi at perferendis aliquam consequuntur aliquid ipsam ratione sapiente ea, dolorum iste facere eveniet soluta eligendi assumenda quo esse dolore et officiis!';

	return (
		<div className="orders">
			{/* <div className="myGigs"> */}
			<div className="container">
				<div className="title">
					<h1>Messages</h1>
				</div>
				<table>
					<tr>
						<td>Buyer</td>
						<td>Last Message</td>
						<td>Date</td>
						<td>Action</td>
					</tr>
					<tr className="active">
						<td>John Doe</td>
						<td>
							<Link to="/message/123" className="link">
								{message.substring(0, 100)}...
							</Link>
						</td>
						<td>1 day ago</td>
						<td>
							<button>Mark as Read</button>
						</td>
					</tr>
					<tr className="active">
						<td>John Doe</td>
						<td>
							<Link to="/message/123" className="link">
								{message.substring(0, 100)}...
							</Link>
						</td>
						<td>1 day ago</td>
						<td>
							<button>Mark as Read</button>
						</td>
					</tr>
					<tr>
						<td>John Doe</td>
						<td>
							<Link to="/message/123" className="link">
								{message.substring(0, 100)}...
							</Link>
						</td>
						<td>1 day ago</td>
					</tr>
					<tr>
						<td>John Doe</td>
						<td>
							<Link to="/message/123" className="link">
								{message.substring(0, 100)}...
							</Link>
						</td>
						<td>1 day ago</td>
					</tr>
					<tr>
						<td>John Doe</td>
						<td>
							<Link to="/message/123" className="link">
								{message.substring(0, 100)}...
							</Link>
						</td>
						<td>1 day ago</td>
					</tr>
					<tr>
						<td>John Doe</td>
						<td>
							<Link to="/message/123" className="link">
								{message.substring(0, 100)}...
							</Link>
						</td>
						<td>1 day ago</td>
					</tr>
					<tr>
						<td>John Doe</td>
						<td>
							<Link to="/message/123" className="link">
								{message.substring(0, 100)}...
							</Link>
						</td>
						<td>1 day ago</td>
					</tr>
				</table>
			</div>
		</div>
		// </div>
	);
};

export default Messages;
