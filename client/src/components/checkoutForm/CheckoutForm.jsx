import React, { useEffect, useState } from 'react';
import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import './CheckoutForm.scss';

const CheckoutForm = ({ dpmCheckerLink }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState();
	const [message, setMessage] = useState();
	const [isLoading, setIsLoading] = useState();

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment suceeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing!');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again!');
					break;
				default:
					setMessage('Something went wrong!');
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: 'https://creatorshub.netlify.app/success',
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected Error occured!');
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: 'tabs',
	};

	return (
		<div className="checkout">
			<form id="payment-form" onSubmit={handleSubmit}>
				<h3>Complete your transaction</h3>
				<LinkAuthenticationElement
					id="link-authentication-element"
					onChange={(e) => setEmail(e.target?.value)}
				/>
				<PaymentElement id="payment-element" options={paymentElementOptions} />
				<button disabled={isLoading || !stripe || !elements} id="submit">
					<span id="button-text">
						{isLoading ? (
							<div className="spinner " id="spinner"></div>
						) : (
							'Pay Now'
						)}
					</span>
				</button>
				{message && <div id="payment-message">{message}</div>}
			</form>
		</div>
	);
};

export default CheckoutForm;
