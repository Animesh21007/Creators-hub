import React, { useState } from 'react';
import './Register.scss';
// import useForm from 'react-hook-form';
import { useForm } from 'react-hook-form';
import upload from '../../utils/upload.js';
import newRequest from '../../utils/api.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [isSeller, setIsSeller] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			country: '',
			isSeller: false,
			phone: '',
			desc: '',
		},
	});
	const [imgfile, setImgfile] = useState(null);

	const onSubmit = async (data) => {
		try {
			let formData = { ...data };
			if (imgfile) {
				const res = await upload(imgfile);
				formData = { ...data, img: res.data?.url };
			}
			const res = await newRequest.post('/auth/signup', formData);
			console.log(res);
			navigate('/');
		} catch (err) {
			console.log(err, 'There was error while sign up!');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="signup">
				<div className="signup__form">
					<h2>Create a new account</h2>
					<label>Username</label>
					<input
						type="text"
						placeholder="johndoe"
						{...register('username', { required: true })}
						aria-invalid={errors.username ? 'true' : 'false'}
					/>
					{!errors.username ? '' : <p>Please enter a username</p>}

					<label>Email</label>
					<input
						type="email"
						placeholder="email"
						{...register('email', { required: true })}
					/>

					<label>Password</label>
					<input
						type="password"
						placeholder="********"
						{...register('password', { required: true })}
					/>

					<label>Profile Picture</label>
					<input type="file" onChange={(e) => setImgfile(e.target.files[0])} />

					<label>Country</label>
					<input type="text" placeholder="USA" {...register('country')} />

					<button className="signup__button">Register</button>
				</div>

				<div className="signup__seller">
					<h2>I want to become a seller</h2>
					<span className="actispan">
						<p>Activate the seller account</p>
						<label className="switch">
							<input
								type="checkbox"
								checked={register.isSeller}
								{...register('isSeller')}
							/>
							<span className="slider round"></span>
						</label>
					</span>

					{true && (
						<>
							<label>Phone Number</label>
							<input
								type="tel"
								placeholder="+1 234 567 89"
								{...register('phone', { minLength: 10 })}
							/>

							<label>Description</label>
							<textarea
								placeholder="A short description of yourself"
								{...register('desc')}
							/>
						</>
					)}
				</div>
			</div>
		</form>
	);
};

export default Register;
