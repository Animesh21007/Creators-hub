import React, { useEffect } from 'react';
import './Success.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/api';

const Sucess = () => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(search);
	const payment_intent = params.get('payment_intent');

	useEffect(() => {
		const makeRequest = async () => {
			try {
				await newRequest.put('/orders', { payment_intent });
				setTimeout(() => {
					navigate('/orders');
				}, 3000);
			} catch (err) {
				console.log(err);
			}
		};

		makeRequest();
	}, []);

	return (
		<div className="Success">
			Payment Successful. Please wait for few seconds
		</div>
	);
};

export default Sucess;
