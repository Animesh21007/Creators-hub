import React from 'react';
import './Gig.scss';
import { Slider } from 'infinite-react-carousel';
import star from '../../../public/images/star.png';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/api';
import Reviews from '../reviews/Reviews';

const Gig = () => {
	const { id } = useParams();
	console.log(id, 'fdsg');
	const { isLoading, data, error } = useQuery({
		queryKey: ['gig'],
		queryFn: async () => {
			const res = await newRequest.get(`/gigs/single/${id}`);
			return res.data;
		},
	});

	const userId = data?.userId;

	const {
		isLoading: isLoadingUser,
		data: userData,
		error: userError,
	} = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const res = await newRequest.get(`/users/${userId}`);
			console.log(res.data);
			return res.data;
		},
		enabled: !!userId,
	});

	return (
		<div className="gig">
			{isLoading ? (
				'Loading ...'
			) : error ? (
				'Something went wrong!'
			) : (
				<div className="container">
					<div className="left">
						<span className="breadCrumbs">
							FIVERR '{'>'}'GRAPHICS & DESIGN'{'>'}'
						</span>
						<h1>{data.title}</h1>
						<div className="user">
							<img src="" alt="" />
							<span>John Doe</span>
							<div className="stars">
								<img src="../../../public/images/star.png" alt="" />
								<img src="../../../public/images/star.png" alt="" />
								<img src="../../../public/images/star.png" alt="" />
								<img src="../../../public/images/star.png" alt="" />
								<img src="../../../public/images/star.png" alt="" />
								<span>5</span>
							</div>
						</div>
						<Slider slidesToShow={1} arrowsScroll={1} className="slider">
							{data &&
								data?.images.map((img) => <img key={img} src={img} alt="" />)}
						</Slider>
						<h2>{data.shortTitle}</h2>
						<p>{data.shortDesc}</p>

						{isLoadingUser ? (
							'Loading ...'
						) : (
							<div className="seller">
								<h2>About The Seller</h2>
								<div className="user">
									<img
										src={userData?.img || '../../../public/images/avatar.jpg'}
										alt=""
									/>
									<div className="info">
										<span>{userData?.username}</span>
										<div className="stars">
											<span>
												{isNaN(data.totalStars / data.starNumber) ? (
													<>
														<img src={star} alt="" /> 1
													</>
												) : (
													<>
														{Array(
															Math.floor(data.totalStars / data.starNumber)
														)
															.fill()
															.map((item, i) => (
																<img
																	src={star}
																	alt=""
																	key={i * Math.random()}
																/>
															))}
														{Math.floor(data.totalStars / data.starNumber)}
													</>
												)}
											</span>
										</div>
										<button>Contact Me</button>
									</div>
								</div>

								<div className="box">
									<div className="items">
										<div className="item">
											<span className="title">From</span>
											<span className="desc">{userData.country}</span>
										</div>
										<div className="item">
											<span className="title">Member since</span>
											<span className="desc">Aug 2022</span>
										</div>
										<div className="item">
											<span className="title">Avg. response time</span>
											<span className="desc">4 hours</span>
										</div>
										<div className="item">
											<span className="title">Last delivery</span>
											<span className="desc">1 day</span>
										</div>
										<div className="item">
											<span className="title">Languages</span>
											<span className="desc">English</span>
										</div>
									</div>
									<hr />
									<p>
										{userData.desc
											? userData.desc
											: `My name is Anna, I enjoy creating AI generated art in my
										spare time. I have a lot of experience using the AI program
										and that means I know what to prompt the AI with to get a
										great and incredibly detailed result.`}
									</p>
								</div>
							</div>
						)}
						{<Reviews gigId={id} star={star} />}
					</div>
					<div className="right">
						<div className="price">
							<h3>{data.shortTitle}</h3>
							<h2>$ {data.price}</h2>
						</div>
						<p>{data.shortDesc}</p>
						<div className="details">
							<div className="item">
								<img src="../../../public/images/clock.png" alt="" />
								<span>{data.deliveryTime} Days Delivery</span>
							</div>
							<div className="item">
								<img src="../../../public/images/recycle.png" alt="" />
								<span>{data.revisionNumber} Revisions</span>
							</div>
						</div>
						<div className="features">
							{data.features.map((feature) => (
								<div className="item" key={feature}>
									<img src="../../../public/images/greencheck.png" alt="" />
									<span>{feature}</span>
								</div>
							))}
						</div>
						<button>Continue</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Gig;
