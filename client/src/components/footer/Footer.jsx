import React from 'react';
import './Footer.scss';

const Footer = () => {
	return (
		<div className="footer">
			<hr />
			<div className="container">
				<hr />
				<div className="bottom">
					<div className="left">
						<h2>Creators'Hub </h2>
						<span>© Freelancers' Ltd. 2024</span>
					</div>
					<div className="right">
						<div className="social">
							<img src="/images/twitter .png" alt="" />
							<img src="/images/facebook.png" alt="" />
							<img src="/images/linkedin.png" alt="" />
							{/* <img src="/images/pinterest.png" alt="" /> */}
							<img src="/images/instagram.png" alt="" />
						</div>
						{/* <div className="link">
							<img src="/images/language.png" alt="" />
							English
						</div> */}
						{/* <div className="link">
							<img src="/images/coin.png" alt="" />
							<span>USD</span>
						</div> */}
						<img src="/images/accessibility.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
