import React from 'react';
import Review from '../../components/review/Review';
import './Reviews.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from './../../utils/api';

const Reviews = ({ gigId, star }) => {
	const queryClient = useQueryClient();

	const { isLoading, data, error } = useQuery({
		queryKey: [`reviews`],
		queryFn: async () => {
			const res = await newRequest.get(`/reviews/${gigId}`);
			// console.log(res.data);
			return res.data;
		},
	});

	const mutation = useMutation({
		mutationFn: async (review) => {
			return newRequest.post('/reviews/create', review);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('reviews');
		},
	});

	const handleReview = (e) => {
		e.preventDefault();
		const desc = e.target[0].value;
		const star = e.target[1].value;
		mutation.mutate({ gigId, desc, star });
	};

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
			<div className="add">
				<h2>Add a Review</h2>
				<form className="addForm" onSubmit={handleReview}>
					<textarea type="text" name="" id="" />
					<span>
						<select name="" id="">
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
						</select>
						<button>Submit</button>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Reviews;
