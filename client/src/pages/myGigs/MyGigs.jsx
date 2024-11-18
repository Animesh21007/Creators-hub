import React from 'react';
import './MyGigs.scss';
import { Link } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/api';

const MyGigs = () => {
	const curruser = getCurrentUser();

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery({
		queryKey: ['myGigs'],
		queryFn: async () => {
			const res = await newRequest.get(`/gigs?userId=${curruser._id}`);
			return res.data;
		},
	});

	const mutation = useMutation({
		mutationFn: (id) => {
			return newRequest.delete(`/gigs/delGig/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['myGigs']);
		},
	});

	const handleDelete = (id) => {
		mutation.mutate(id);
	};

	return (
		<div className="myGigs">
			{isLoading ? (
				'Loading...'
			) : error ? (
				'There was some error!'
			) : (
				<div className="container">
					<div className="title">
						<h1>Gigs</h1>
						<Link to="/add">
							<button>Add New Gig</button>
						</Link>
					</div>
					<table>
						<tr>
							<td>Image</td>
							<td>Title</td>
							<td>Price</td>
							<td>Sales</td>
							<td>Action</td>
						</tr>
						{data?.map((gig) => (
							<tr>
								<td key={gig._id}>
									<img
										className="img"
										src={
											gig.cover ||
											'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600'
										}
										alt=""
									/>
								</td>
								<td>{gig.title}</td>
								<td>{gig.price}</td>
								<td>123</td>
								<td>
									<img
										className="delete"
										src="/images/delete.png"
										alt=""
										onClick={() => handleDelete(gig._id)}
									/>
								</td>
							</tr>
						))}
					</table>
				</div>
			)}
		</div>
	);
};

export default MyGigs;
