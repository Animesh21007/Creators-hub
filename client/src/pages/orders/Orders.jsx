import React from 'react';
import './Orders.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/api';

const Orders = () => {
	const navigate = useNavigate();

	const curruser = JSON.parse(localStorage.getItem('userInfo')) || {
		id: 1,
		username: 'John Doe',
		isSeller: true,
	};

	const { isLoading, data, error } = useQuery({
		queryKey: ['order'],
		queryFn: async () => {
			const res = await newRequest.get('/orders/get/');
			console.log(res.data);
			return res.data;
		},
	});

	const handleConvo = async (order) => {
		const sellerId = order.sellerId;
		const buyerId = order.buyerId;
		const id = sellerId + buyerId;

		try {
			const res = await newRequest.get(`/conversations/single/${id}`);
			navigate(`/messages/${res.conversationId}`);
			console.log(res);
		} catch (err) {
			// if(err)
			if (err.status === 404) {
				const res2 = await newRequest.post('/conversations/createConvo', {
					to: curruser.isSeller ? buyerId : sellerId,
				});
				if (res2) {
					navigate(`/messages/${res2.conversationId}`);
				}
			}
		}
	};

	return (
		<div className="orders">
			{/* <div className="myGigs"> */}
			<div className="container">
				<div className="title">
					<h1>Orders</h1>
				</div>
				{isLoading ? (
					'Loading...'
				) : (
					<>
						{data && data.length > 0 ? (
							<table>
								<thead>
									<tr>
										<td>Image</td>
										<td>Title</td>
										<td>Price</td>
										{/* <td>{curruser?.isSeller ? 'Buyer' : 'Seller'}</td> */}
										<td>Contact</td>
									</tr>
								</thead>
								{data?.length > 0 && (
									<tbody>
										{data.map((order) => (
											<tr key={order._id}>
												<td>
													<img
														className="img"
														src={
															order.img ||
															'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600'
														}
														alt=""
													/>
												</td>
												<td>{order?.title}</td>
												<td>{order?.price}</td>
												<td>
													<img
														className="delete"
														src="/images/message.png"
														alt=""
														onClick={() => handleConvo(order)}
													/>
												</td>
											</tr>
										))}
									</tbody>
								)}
							</table>
						) : (
							<h2 className="ordeal">No Orders Yet !</h2>
						)}
					</>
				)}
			</div>
		</div>
		// </div>
	);
};

export default Orders;
