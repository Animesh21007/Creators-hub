import Featured from '../../components/featured/Featured';
import './Home.scss';
// import TrustedBy from '../../components/trustedby/TrustedBy';
import CategoryCard from '../../components/categoryCards/CategoryCard';
import { cards, projects } from '../../data';
import ProjectCard from './../../components/projects/ProjectCard';
import Slides from './../../components/slides/Slides';

const Home = () => {
	return (
		<div className="home">
			<Featured />
			{/* <TrustedBy /> */}
			<Slides slidesToShow={4} arrowsScroll={5}>
				{cards?.map((card) => (
					<CategoryCard item={card} key={card.id * Math.random()} />
				))}
			</Slides>
			<div className="features">
				<div className="container">
					<div className="cont">
						<div className="item">
							<h1>
								Explore a vast pool of skilled professionals ready to tackle
								your projects.
							</h1>
							<div className="title">
								<img src="/images/check.png" alt="" />
								Top-notch services tailored to your needs.
							</div>
							<p>Transparent pricing—pay for results, not hours.</p>
						</div>
						<div className="item">
							<h1>A whole world of freelance talent at your fingertips</h1>
							<div className="title">
								<img src="/images/check.png" alt="" />
								The best for every budget
							</div>
							<p>
								Find high-quality services at every price point. No hourly
								rates, just project-based pricing.
							</p>
						</div>
						<div className="item">
							<h1>Unlock expert talent from around the globe with ease</h1>
							<div className="title">
								<img src="/images/check.png" alt="" />
								Quality you can trust, no matter your budget
							</div>
							<p>Simple, project-based pricing for every service you need.</p>
						</div>
						<div className="item">
							<h1>Connect with freelancers who bring your ideas to life</h1>
							<div className="title">
								<img src="/images/check.png" alt="" />
								No hourly charges—only clear and fair project ratesAffordable
								excellence for every kind of project
							</div>
							<p>No hourly charges—only clear and fair project rates.</p>
						</div>
					</div>

					{/* <div className="item">
						<video src="" controls></video>
					</div> */}
				</div>
			</div>

			<div className="features dark text-dark crimson">
				<div className="container" style={{ width: '50%' }}>
					<div className="item" id="item2">
						<h1>
							<i>business</i>
						</h1>
						<h1>
							A business solution designed for <i>teams</i>
						</h1>
						<p>
							Upgrade to a curated experience packed with tools and benefits,
							dedicated to businesses
						</p>
						<div className="title">
							<img src="/images/check.png" alt="" />
							Connect to freelancers with proven business experience
						</div>

						<div className="title">
							<img src="/images/check.png" alt="" />
							Get matched with the perfect talent by a customer success manager
						</div>

						<div className="title">
							<img src="/images/check.png" alt="" />
							Manage teamwork and boost productivity with one powerful workspace
						</div>
						<button>Explore Creators'hub Businesses</button>
					</div>
				</div>
			</div>
			<Slides slidesToShow={3} arrowsScroll={5}>
				{projects?.map((card) => (
					<ProjectCard item={card} key={card.id * Math.random()} />
				))}
			</Slides>
		</div>
	);
};

export default Home;
