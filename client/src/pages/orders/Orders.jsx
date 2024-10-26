import React from 'react';
import './Orders.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/api';

const Orders = () => {
	const curruser = JSON.parse(localStorage.getItem('userInfo')) || {
		id: 1,
		username: 'John Doe',
		isSeller: true,
	};

	const { isLoading, data, error } = useQuery({
		queryKey: ['order'],
		queryFn: async () => {
			const res = await newRequest.get('/orders/');
			console.log(res.data);
			return res.data;
		},
	});

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
					<table>
						<tr>
							<td>Image</td>
							<td>Title</td>
							<td>Price</td>
							{/* <td>{curruser?.isSeller ? 'Buyer' : 'Seller'}</td> */}
							<td>Contact</td>
						</tr>
						{data &&
							data.map((order) => (
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
											src="../../../public/images/message.png"
											alt=""
										/>
									</td>
								</tr>
							))}
					</table>
				)}
			</div>
		</div>
		// </div>
	);
};

export default Orders;
