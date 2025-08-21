import { useQuery } from '@tanstack/react-query';
import newRequest from './../../utils/api';
import './Review.scss';

const Review = ({ star, review }) => {
	console.log(review);

	const { isLoading, data, error } = useQuery({
		queryKey: [review._id],
		queryFn: async () => {
			const res = await newRequest.get(`/users/${review.userId}`);
			console.log(res.data);
			return res.data;
		},
	});

	console.log(isLoading ? '' : data);

	return (
		<div className="review">
			{isLoading ? (
				'Loading...'
			) : error ? (
				'There was an error'
			) : (
				<>
					<div className="user">
						<img
							className="pp"
							src={
								data.img ||
								'https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600'
							}
							alt=""
						/>
						<div className="info">
							<span>{data.username}</span>
							<div className="country">
								<span>{data.country}</span>
							</div>
						</div>
					</div>
					<div className="stars">
						{review.star === 0 ? (
							<img src={star} alt="" />
						) : (
							Array(review.star)
								.fill()
								?.map((item, i) => (
									<img src={star} alt="" key={i * Math.random()} />
								))
						)}
						<span>{review.star}</span>
					</div>
					<p>{review.desc}</p>
					<div className="helpful">
						<span>Helpful?</span>
						<img src="/img/like.png" alt="" />
						<span>Yes</span>
						<img src="/img/dislike.png" alt="" />
						<span>No</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Review;
