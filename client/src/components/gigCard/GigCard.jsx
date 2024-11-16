import React from 'react';
import './GigCard.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/api';
import star from '/images/star.png';

const GigCard = ({ item }) => {
	const { isLoading, data, error } = useQuery({
		queryKey: [`${item._id}`],
		queryFn: async () => {
			const res = await newRequest(`/users/${item.userId}`);
			return res.data;
		},
	});

	return (
		<>
			{isLoading
				? 'Loading...'
				: data && (
						<Link to={`/gig/${item._id}`} className="link">
							<div className="gigcard">
								<img src={item.cover} alt="" />
								<div className="info">
									{!isLoading && (
										<div className="user">
											<img
												src={data.img ? data.img : '/images/avatar.jpg'}
												alt=""
											/>
											<span>{data.username}</span>
										</div>
									)}
									<p>{item.desc}</p>
									<div className="star">
										{/* <img src="/images/star.png" alt="" /> */}
										<span>
											{Array(
												Math.max(
													0,
													Math.floor(item.totalStars / item.starNumber)
												) || 0
											)
												.fill()
												.map((item, i) => (
													<img src={star} alt="" key={i * Math.random()} />
												))}
										</span>
										{Math.floor(item.totalStars / item.starNumber)}
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
				  )}
		</>
	);
};

export default GigCard;
