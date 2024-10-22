import React from 'react';
import './Home.scss';
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedby/TrustedBy';
import { cards, projects } from '../../data';
import CategoryCard from '../../components/categoryCards/CategoryCard';
import Slides from './../../components/slides/Slides';
import ProjectCard from './../../components/projects/ProjectCard';

const Home = () => {
	return (
		<div className="home">
			<Featured />
			<TrustedBy />
			<Slides slidesToShow={4} arrowsScroll={5}>
				{cards.map((card) => (
					<CategoryCard item={card} key={card.id * Math.random()} />
				))}
			</Slides>
			<div className="features">
				<div className="container">
					<div className="cont">
						<div className="item">
							<h1>A whole world of freelance talent at your fingertips</h1>
							<div className="title">
								<img src="../../../public/images/check.png" alt="" />
								The best for every budget
							</div>
							<p>
								Find high-quality services at every price point. No hourly
								rates, just project-based pricing.
							</p>
						</div>
						<div className="item">
							<h1>A whole world of freelance talent at your fingertips</h1>
							<div className="title">
								<img src="../../../public/images/check.png" alt="" />
								The best for every budget
							</div>
							<p>
								Find high-quality services at every price point. No hourly
								rates, just project-based pricing.
							</p>
						</div>
						<div className="item">
							<h1>A whole world of freelance talent at your fingertips</h1>
							<div className="title">
								<img src="../../../public/images/check.png" alt="" />
								The best for every budget
							</div>
							<p>
								Find high-quality services at every price point. No hourly
								rates, just project-based pricing.
							</p>
						</div>
						<div className="item">
							<h1>A whole world of freelance talent at your fingertips</h1>
							<div className="title">
								<img src="../../../public/images/check.png" alt="" />
								The best for every budget
							</div>
							<p>
								Find high-quality services at every price point. No hourly
								rates, just project-based pricing.
							</p>
						</div>
					</div>

					<div className="item">
						<video src="" controls></video>
					</div>
				</div>
			</div>

			<div className="features dark">
				<div className="container">
					<div className="item">
						<h1>
							fiverr <i>business</i>
						</h1>
						<h1>
							A business solution designed for <i>teams</i>
						</h1>
						<p>
							Upgrade to a curated experience packed with tools and benefits,
							dedicated to businesses
						</p>
						<div className="title">
							<img src="../../../public/images/check.png" alt="" />
							Connect to freelancers with proven business experience
						</div>

						<div className="title">
							<img src="../../../public/images/check.png" alt="" />
							Get matched with the perfect talent by a customer success manager
						</div>

						<div className="title">
							<img src="../../../public/images/check.png" alt="" />
							Manage teamwork and boost productivity with one powerful workspace
						</div>
						<button>Explore Fiverr Businesses</button>
					</div>

					<div className="item">
						<img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png" />
					</div>
				</div>
			</div>
			<Slides slidesToShow={3} arrowsScroll={5}>
				{projects.map((card) => (
					<ProjectCard item={card} key={card.id * Math.random()} />
				))}
			</Slides>
		</div>
	);
};

export default Home;
