import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ListSkeleton = ({ count = 5, height = 30 }) => {
	return (
		<div>
			{Array.from({ length: count }).map((_, i) => (
				<Skeleton
					key={i * Math.random()}
					style={{ marginBottom: '10px' }}
					height={height}
				/>
			))}
		</div>
	);
};

export default ListSkeleton;
