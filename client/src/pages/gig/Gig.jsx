import { useQuery } from '@tanstack/react-query';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/api';
import Reviews from '../reviews/Reviews';
import './Gig.scss';
import star from '/images/star.png';

const Gig = () => {
	const { id } = useParams();
	console.log(id, 'fdsg');
	const { isLoading, data, error } = useQuery({
		queryKey: [id],
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
			// console.log(res.data, 'Something amongst ages');
			return res.data;
		},
		enabled: !!userId,
	});

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

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
							Creators'Hub {'>'}GRAPHICS & DESIGN{'>'}
						</span>
						<h1>{data.title}</h1>
						<div className="user">
							<img src="" alt="" />
							<span>John Doe</span>
							<div className="stars">
								<img src="/images/star.png" alt="" />
								<img src="/images/star.png" alt="" />
								<img src="/images/star.png" alt="" />
								<img src="/images/star.png" alt="" />
								<img src="/images/star.png" alt="" />
								<span>5</span>
							</div>
						</div>
						<div className="carousel-container">
							<Carousel
								responsive={responsive}
								arrows={true}
								infinite={true}
								autoPlay={false}
								autoPlaySpeed={3000}
								slidesToSlide={1}>
								{data && data.images && data.images.length > 0 ? (
									data?.images?.map((img, idx) => (
										<img key={idx} src={img} alt="" />
									))
								) : (
									<p>No images available</p>
								)}
							</Carousel>
						</div>
						<h2>{data.shortTitle}</h2>
						<p>{data.shortDesc}</p>
						<hr />
						{isLoadingUser ? (
							'Loading ...'
						) : (
							<div className="seller">
								<h2>About The Seller</h2>
								<div className="user">
									<img src={userData?.img || '/images/avatar.jpg'} alt="" />
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
															?.map((item, i) => (
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

								{userData && (
									<div className="box">
										<div className="items">
											<div className="item">
												<span className="title">From</span>
												<span className="desc">{userData?.country}</span>
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
												? userData?.desc
												: `My name is Anna, I enjoy creating AI generated art in my
										spare time. I have a lot of experience using the AI program
										and that means I know what to prompt the AI with to get a
										great and incredibly detailed result.`}
										</p>
									</div>
								)}
							</div>
						)}
						<hr />
						{<Reviews gigId={id} star={star} />}
					</div>
					<div className="right">
						<div className="price">
							<h3>{data.shortTitle}</h3>
							<h2>₹ {data.price}</h2>
						</div>
						<p>{data.shortDesc}</p>
						<div className="details">
							<div className="item">
								<img src="/images/clock.png" alt="" />
								<span>{data?.deliveryTime ?? '-'} Days Delivery</span>
							</div>
							<div className="item">
								<img src="/images/recycle.png" alt="" />
								<span>{data?.revisionNumber ?? '-'} Revisions</span>
							</div>
						</div>
						<div className="features">
							{data?.features?.map((feature) => (
								<div className="item" key={feature}>
									<img src="/images/greencheck.png" alt="" />
									<span>{feature}</span>
								</div>
							))}
						</div>
						<Link to={`/pay/${id}`}>
							<button>Continue</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Gig;
