import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import newRequest from '../../utils/api';
import './Success.scss';

const Success = () => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const params = new URLSearchParams(search);
	const payment_intent = params.get('payment_intent');

	useEffect(() => {
		const makeRequest = async () => {
			try {
				await newRequest.put('/orders', { payment_intent });
				showToast('success', 'Payment recorded successfully!');
				setTimeout(() => {
					navigate('/orders');
				}, 3000);
			} catch (err) {
				console.log(err);
				showToast('error', 'Failed to record payment.');
				toast.dismiss(loadingToastId);
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

export default Success;
