import React from 'react';
import './Message.scss';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/api.js';

const Message = () => {
	const queryClient = useQueryClient();

	const { id } = useParams();

	const curruser = JSON.parse(localStorage.getItem('userInfo'));

	const { isLoading, data, error } = useQuery({
		queryKey: ['messages'],
		queryFn: async () => {
			const res = await newRequest.get(`/messages/${id}`);
			// console.log(res.data[2].desc);
			return res.data;
		},
	});

	const mutation = useMutation({
		mutationFn: (message) => {
			return newRequest.post('/messages/', message);
		},

		onSuccess: () => {
			queryClient.invalidateQueries(['messages']);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate({
			conversationId: id,
			desc: e.target[0].value,
		});
		e.target[0].value = '';
	};

	return (
		<div className="message">
			{isLoading ? (
				'Loading...'
			) : error ? (
				'Something went wrong!'
			) : (
				<div className="container">
					<span className="breadcrumbs">
						<Link to="/messages">MESSAGES</Link>'{'>'}' JOHN DOE '{'>'}'
					</span>
					{data.map((msg) => (
						<div className="messages" key={msg._id}>
							<div
								className={msg.userId !== curruser._id ? 'owner item' : 'item'}>
								<img
									src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
									alt=""
								/>
								<p>{msg.desc}</p>
							</div>
						</div>
					))}
					<hr />
					<form className="write" onSubmit={handleSubmit}>
						<textarea
							name=""
							placeholder="write a message"
							id=""
							cols="30"
							rows="10"></textarea>
						<button type="submit">Send</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Message;
