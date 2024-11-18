import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import Cookies from 'js-cookie';
import newRequest from './../../utils/api';

const Navbar = () => {
	const [isActive, setIsActive] = useState(false);
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const isactive = () => {
		window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
		// console.log('hell');
	};

	useEffect(() => {
		window.addEventListener('scroll', isactive);
		return () => window.removeEventListener('scroll', isactive);
	}, []);

	const currentUser = JSON.parse(localStorage.getItem('userInfo'));

	const handleLogout = async () => {
		try {
			const res = await newRequest.post('/auth/logout', {});
			// console.log(res);
			navigate('/');
			localStorage.removeItem('userInfo');
			Cookies.remove('accessToken');
		} catch (err) {
			console.log(err);
		}
	};

	// if(curr)

	return (
		<div className={isActive || pathname !== '/' ? 'navbar active' : 'navbar'}>
			<div className="container">
				<div className="logo">
					<Link to="/" className="link">
						<span className="text">creators'hub </span>
						<span>.</span>
					</Link>
				</div>
				<div className="links">
					<Link to="/" className="link">
						Home
					</Link>
					<Link to="/gigs" className="link">
						Explore
					</Link>
					{/* 
					<span>English</span> */}
					{!currentUser && (
						<Link to="/login" className="link">
							Sign In
						</Link>
					)}
					{/* {!currentUser?.isSeller && <Link to='/'>Become a Seller</Link>} */}
					{!currentUser && (
						<button>
							<Link to="/register" className="link">
								Sign Up
							</Link>
						</button>
					)}
					{currentUser && (
						<div className="user">
							<img
								src={currentUser?.img ? currentUser.img : '/images/avatar.jpg'}
								alt=""
							/>
							<span onClick={() => setOpen((prev) => !prev)}>
								{currentUser?.username}
							</span>
							{open && (
								<div
									className="options"
									onClick={() => setOpen((prev) => false)}>
									{currentUser?.isSeller && (
										<>
											<Link className="link" to="/mygigs">
												Gigs
											</Link>
											<Link className="link" to="/add">
												Add a gig
											</Link>
										</>
									)}
									<Link className="link" to="/orders">
										Orders
									</Link>
									<Link className="link" to="/messages">
										Messages
									</Link>
									<button className="link logout" onClick={handleLogout}>
										Logout
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			{isActive || (pathname !== '/' && <hr />)}
			{/* {(isActive || pathname !== '/') && (
				<>
					<hr />
					<div className="menu">
						<Link className="link menuLink" to="/">
							Graphics and Design
						</Link>
						<Link className="link" to="/">
							Video & Automation
						</Link>
						<Link className="link" to="/">
							Writing & Transformation
						</Link>
						<Link className="link" to="/">
							AI Services
						</Link>
						<Link className="link" to="/">
							Digital Marketing
						</Link>
						<Link className="link" to="/">
							Music & Audio
						</Link>
						<Link className="link" to="/">
							Programming & Tech
						</Link>
						<Link className="link" to="/">
							Business
						</Link>
						<Link className="link" to="/">
							Lifestyle
						</Link>
					</div>
					<hr />
				</>
			)} */}
		</div>
	);
};

export default Navbar;
