import React from 'react';
import './Messages.scss';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/api';
import moment from 'moment';

const Messages = () => {
	const curruser = JSON.parse(localStorage.getItem('userInfo')) || {
		id: 1,
		username: 'John Doe',
		isSeller: true,
	};

	const { isLoading, data, error } = useQuery({
		queryKey: ['conversations'],
		queryFn: async () => {
			const res = await newRequest.get('/conversations');
			return res.data;
		},
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id) => {
			return newRequest.put(`/conversations/${id}`);
		},

		onSuccess: () => {
			queryClient.invalidateQueries(['conversations']);
		},
	});

	const handleRead = (id) => {
		mutation.mutate(id);
		// console.log('Done', id);
	};

	return (
		<div className="orders">
			{/* <div className="myGigs"> */}
			<div className="container">
				<div className="title">
					<h1>Messages</h1>
				</div>

				{isLoading ? (
					'Loading...'
				) : (
					<>
						{data && data.length > 0 ? (
							<table>
								<thead>
									<tr>
										<td>{!curruser.isSeller ? 'Seller' : 'Buyer'}</td>
										<td>Last Message</td>
										<td>Date</td>
										<td>Action</td>
									</tr>
								</thead>
								{data?.length > 0 && (
									<tbody>
										{data.map((convo) => (
											<tr
												key={Math.random().toString(36)}
												className={
													(curruser.isSeller && !convo.readBySeller) ||
													(!curruser.isSeller && !convo.readBySeller
														? 'active'
														: '')
												}>
												<td>
													{curruser.isSeller ? convo?.buyerId : convo?.sellerId}
												</td>
												<td>
													<Link to={`/message/${convo.id}`} className="link">
														{convo?.lastMsg?.substring(0, 100)}...
													</Link>
												</td>
												<td>{moment(convo.updatedAt).fromNow()}</td>
												<td>
													{/* {(curruser.isSeller && !convo.readBySeller) ||
											(!curruser.isSeller && !convo.readBySeller ? (
												<button id="bt" onClick={() => handleRead(convo.id)}>
													Mark as Read
												</button>
											) : (
												<button id="bt">Seen</button>
											))} */}
													{(curruser.isSeller && !convo.readBySeller) ||
													(!curruser.isSeller && !convo.readByBuyer) ? (
														<button
															id="bt"
															onClick={() => handleRead(convo.id)}>
															Mark as Read
														</button>
													) : (
														<button id="bt">Seen</button>
													)}
												</td>
											</tr>
										))}
									</tbody>
								)}
							</table>
						) : (
							<h2 className="ordeal">No Messages Yet !</h2>
						)}
					</>
				)}
			</div>
		</div>
		// </div>
	);
};

export default Messages;
