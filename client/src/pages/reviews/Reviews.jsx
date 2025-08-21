import React, { useTransition } from 'react';
import Review from '../../components/review/Review';
import './Reviews.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from './../../utils/api';
import { useToast } from '../../context/ToastContext';

const Reviews = ({ gigId, star }) => {
	const queryClient = useQueryClient();
	const toast = useToast();

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
			try {
				const res = await newRequest.post('/reviews/create', review);
				console.log(res, 'review response');
				return res;
			} catch (error) {
				console.log(error, 'Err in reviews.jsx');
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries('reviews');
		},
		onError: (e) => {
			if (e.response && e.reponse.data) {
				toast('error', e.reponse.data.message);
			}
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
			<p className="head">Reviews</p>
			<hr />
			{isLoading
				? 'Loading...'
				: error
				? 'Something went wrong!'
				: data?.map((review) => (
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
