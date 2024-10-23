import React from 'react';
import Review from '../../components/review/Review';
import './Reviews.scss';

const Reviews = ({ gigId, star }) => {
	return (
		<div className="reviews">
			<h2>Reviews</h2>
			<Review star={star} />
		</div>
	);
};

export default Reviews;
