import './Footer.scss';

const Footer = () => {
	return (
		<div className="footer">
			<div className="container">
				<hr />
				<div className="bottom">
					<div className="left">
						<h2>Creators'Hub</h2>
						<span>© Freelancers' Ltd. 2024</span>
					</div>

					<div className="right">
						<div className="social">
							<img src="/images/facebook.png" alt="Facebook" />
							<img src="/images/linkedin.png" alt="LinkedIn" />
							<img src="/images/instagram.png" alt="Instagram" />
						</div>

						{/* Optional future links
						<div className="link">
							<img src="/images/language.png" alt="Language" />
							English
						</div>
						<div className="link">
							<img src="/images/coin.png" alt="Currency" />
							<span>USD</span>
						</div> 
						*/}

						<img
							src="/images/accessibility.png"
							alt="Accessibility"
							className="accessibility"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
