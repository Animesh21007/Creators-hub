import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from './../../utils/api';
import './Navbar.scss';

const Navbar = () => {
	const [isActive, setIsActive] = useState(false);
	const [open, setOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const isactive = () => {
		window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
		// console.log('hell');
	};
	const handleLinkClick = () => {
		setOpen(false);
		setMobileOpen(false);
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
					<Link to="/" className="link" onClick={handleLinkClick}>
						<span className="text">creators'hub </span>
						<span>.</span>
					</Link>
				</div>
				<div
					className="hamburger"
					onClick={() => setMobileOpen((prev) => !prev)}>
					<div>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div className={`links ${mobileOpen ? 'open' : ''}`}>
					<Link to="/" className="link" onClick={handleLinkClick}>
						Home
					</Link>
					<Link to="/gigs" className="link" onClick={handleLinkClick}>
						Explore
					</Link>
					{/* 
					<span>English</span> */}
					{!currentUser && (
						<Link to="/login" className="link" onClick={handleLinkClick}>
							Sign In
						</Link>
					)}
					{/* {!currentUser?.isSeller && <Link to='/'>Become a Seller</Link>} */}
					{!currentUser && (
						<button>
							<Link to="/register" className="link" onClick={handleLinkClick}>
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
											<Link
												className="link"
												onClick={handleLinkClick}
												to="/mygigs">
												Gigs
											</Link>
											<Link
												className="link"
												onClick={handleLinkClick}
												to="/add">
												Add a gig
											</Link>
										</>
									)}
									<Link className="link" onClick={handleLinkClick} to="/orders">
										Orders
									</Link>
									<Link
										className="link"
										onClick={handleLinkClick}
										to="/messages">
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
		</div>
	);
};

export default Navbar;
