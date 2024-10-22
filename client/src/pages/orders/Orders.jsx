import React from 'react';
import './Orders.scss';
import { Link } from 'react-router-dom';

const Orders = () => {
	const curruser = {
		id: 1,
		username: 'John Doe',
		isSeller: true,
	};

	return (
		<div className="orders">
			{/* <div className="myGigs"> */}
			<div className="container">
				<div className="title">
					<h1>Orders</h1>
				</div>
				<table>
					<tr>
						<td>Image</td>
						<td>Title</td>
						<td>Price</td>
						<td>{curruser?.isSeller ? 'Buyer' : 'Seller'}</td>
						<td>Contact</td>
					</tr>
					<tr>
						<td>
							<img
								className="img"
								src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
								alt=""
							/>
						</td>
						<td>Gig1</td>
						<td>88</td>
						<td>123</td>
						<td>
							<img
								className="delete"
								src="../../../public/images/message.png"
								alt=""
							/>
						</td>
					</tr>
					<tr>
						<td>
							<img
								className="img"
								src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
								alt=""
							/>
						</td>
						<td>Gig1</td>
						<td>88</td>
						<td>123</td>
						<td>
							<img
								className="delete"
								src="../../../public/images/message.png"
								alt=""
							/>
						</td>
					</tr>
					<tr>
						<td>
							<img
								className="img"
								src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
								alt=""
							/>
						</td>
						<td>Gig1</td>
						<td>88</td>
						<td>123</td>
						<td>
							<img
								className="delete"
								src="../../../public/images/message.png"
								alt=""
							/>
						</td>
					</tr>
					<tr>
						<td>
							<img
								className="img"
								src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
								alt=""
							/>
						</td>
						<td>Gig1</td>
						<td>88</td>
						<td>123</td>
						<td>
							<img
								className="delete"
								src="../../../public/images/message.png"
								alt=""
							/>
						</td>
					</tr>
					<tr>
						<td>
							<img
								className="img"
								src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
								alt=""
							/>
						</td>
						<td>Gig1</td>
						<td>88</td>
						<td>123</td>
						<td>
							<img
								className="delete"
								src="../../../public/images/message.png"
								alt=""
							/>
						</td>
					</tr>
					<tr>
						<td>
							<img
								className="img"
								src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
								alt=""
							/>
						</td>
						<td>Gig1</td>
						<td>88</td>
						<td>123</td>
						<td>
							<img
								className="delete"
								src="../../../public/images/message.png"
								alt=""
							/>
						</td>
					</tr>
				</table>
			</div>
		</div>
		// </div>
	);
};

export default Orders;
