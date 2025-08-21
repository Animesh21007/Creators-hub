import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import newRequest from '../../utils/api';
import './Login.scss';

const Login = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const { showToast } = useToast();

	const onSubmit = async (data) => {
		console.log('Submit', data);

		try {
			const res = await newRequest.post('/auth/login', data);
			console.log(res);
			if (res) {
				localStorage.setItem('userInfo', JSON.stringify(res.data));
				showToast('success', 'Login successful! Redirecting...');
				navigate('/');
			}
		} catch (err) {
			console.log(err);
			showToast('error', 'Login failed. Please check your credentials!');
		}
	};
	return (
		<div className="login">
			<div className="login-root">
				<div className="flex-flex center-center form-container">
					<form
						id="stripe-login"
						className="formbg flex-flex flex-direction--column padding-horizontal--48 padding-top--48"
						onSubmit={handleSubmit(onSubmit)}>
						<div className="field padding-bottom--24">
							<h2 className="padding-bottom--15">Sign in to your account</h2>
							<label htmlFor="usename">Username</label>
							<input
								type="text"
								name="username"
								id="username"
								{...register('username', { required: true })}
								placeholder="Enter your username"
								aria-invalid={errors.username ? 'true' : 'false'}
							/>
							{errors.username?.type === 'required' && (
								<p role="alert">Username is required!</p>
							)}
						</div>
						<div className="field padding-bottom--24">
							<div className="grid--50-50">
								<label htmlFor="password">Password</label>
								<div className="reset-pass">
									<a href="#">Forgot your password?</a>
								</div>
							</div>
							<input
								type="password"
								name="password"
								id="password"
								{...register('password', { required: true })}
								placeholder="Enter your password"
								aria-required={errors.required ? 'true' : 'false'}
							/>
							{errors.password?.type === 'required' && (
								<p role="alert">Password is required!</p>
							)}
						</div>
						{/* <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
							<label htmlFor="staySignedIn">
								<input
									type="checkbox"
									name="staySignedIn"
									id="staySignedIn"
									checked={formData.staySignedIn}
									onChange={handleChange}
								/>{' '}
								Stay signed in for a week
							</label>
						</div> */}
						<div className="field padding-bottom--24">
							<input type="submit" name="submit" value="Continue" />
						</div>
						{/* <div className="field">
							<a className="ssolink" href="#">
								Use single sign-on (Google) instead
							</a>
						</div> */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
