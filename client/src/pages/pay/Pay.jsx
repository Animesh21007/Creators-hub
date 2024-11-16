import React, { useEffect, useState } from 'react';
import './Pay.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/api';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

const stripePromise = loadStripe(
	import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
		'pk_test_51QEaPrGPaudPE34SsvYFKSgI27wiQ4eXMynAvc4NPpTYkKY3BxCGJjkI6f9gunE8AL9AYFJ6rvPZmbJND9dqST1A00WEKz4Nv6'
);

const Pay = () => {
	const [clientSecret, setClientSecret] = useState('');
	const { id } = useParams();

	const appearance = {
		theme: 'stripe',
	};
	// Enable the skeleton loader UI for optimal loading.
	// const loader = 'auto';

	const options = {
		clientSecret,
		appearance,
	};

	useEffect(() => {
		const handlePayment = async () => {
			try {
				const res = await newRequest.post(
					`/orders/create-payment-intent/${id}`
				);
				setClientSecret(res.data.clientSecret);
				// console.log(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		handlePayment();
	}, []);

	return (
		<div className="pay">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default Pay;
