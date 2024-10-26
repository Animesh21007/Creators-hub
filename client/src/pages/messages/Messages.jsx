import React from 'react';
import './Messages.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/api';

const Messages = () => {
	const curruser = JSON.parse(localStorage.getItem('userInfo')) || {
		id: 1,
		username: 'John Doe',
		isSeller: true,
	};

	const message =
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi at perferendis aliquam consequuntur aliquid ipsam ratione sapiente ea, dolorum iste facere eveniet soluta eligendi assumenda quo esse dolore et officiis!';

	const { isLoading, data, error } = useQuery({
		queryKey: ['conversations'],
		queryFn: async () => {
			const res = await newRequest.get('/conversations/');
			console.log(res);
			return res.data;
		},
	});

	return (
		<div className="orders">
			{/* <div className="myGigs"> */}
			{isLoading ? (
				'Loading...'
			) : (
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
						{data.map((convo) => (
							<tr key={convo.id} className="active">
								<td>{curruser.isSeller ? convo?.buyerId : convo?.sellerId}</td>
								<td>
									<Link to="/message/123" className="link">
										{convo?.lastMsg?.substring(0, 100)}...
									</Link>
								</td>
								<td>{moment(convo.updatedAt).fromNow()}</td>
								<td>
									<button>Mark as Read</button>
								</td>
							</tr>
						))}
					</table>
				</div>
			)}
		</div>
		// </div>
	);
};

export default Messages;
