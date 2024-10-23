import React from 'react';
import Review from '../../components/review/Review';
import './Reviews.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from './../../utils/api';

const Reviews = ({ gigId, star }) => {
	const { isLoading, data, error } = useQuery({
		queryKey: [`${gigId}`],
		queryFn: async () => {
			const res = await newRequest.get(`/reviews/${gigId}`);
			console.log(res.data);
			return res.data;
		},
	});

	return (
		<div className="reviews">
			<h2>Reviews</h2>
			{isLoading
				? 'Loading...'
				: error
				? 'Something went wrong!'
				: data.map((review) => (
						<Review key={review._id} star={star} review={review} />
				  ))}
		</div>
	);
};

export default Reviews;
