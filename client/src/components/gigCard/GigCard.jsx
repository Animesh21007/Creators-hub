import React from 'react';
import './GigCard.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/api';

const GigCard = ({ item }) => {
	const { isLoading, data, error } = useQuery({
		queryKey: [`${item._id}`],
		queryFn: async () => {
			const res = await newRequest(`/users/${item.userId}`);
			// console.log(res);
			return res.data;
		},
	});

	return (
		<Link to={`/gig/${item._id}`} className="link">
			<div className="gigcard">
				<img src={item.cover} alt="" />
				<div className="info">
					{!isLoading && (
						<div className="user">
							<img
								src={data.img ? data.img : '../../../public/images/avatar.jpg'}
								alt=""
							/>
							<span>{data.username}</span>
						</div>
					)}
					<p>{item.desc}</p>
					<div className="star">
						<img src="../../../public/images/star.png" alt="" />
						<span>
							{isNaN(item.totalStars / item.starNumber)
								? Math.round(item.totalStars / item.starNumber)
								: 1}
						</span>
					</div>

					<hr />

					<div className="details">
						<img src={item.cover} alt="" />
						<div className="price">
							<span>STARTING AT</span>
							<h2>${item.price}</h2>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default GigCard;
