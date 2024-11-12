// import React from 'react';
// import './Slides.scss';
// import Slider from 'infinite-react-carousel';

// const Slide = ({ children, slidesToShow, arrowsScroll }) => {
// 	return (
// 		<div className="slide">
// 			<div className="container">
// 				<Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
// 					{children}
// 				</Slider>
// 			</div>
// 		</div>
// 	);
// };

// export default Slide;

import React from 'react';
import './Slides.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Slide = ({ children, slidesToShow }) => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: slidesToShow,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: Math.min(slidesToShow, 2),
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return (
		<div className="slide">
			<div className="container">
				<Carousel
					responsive={responsive}
					arrows={true} // Show navigation arrows
					infinite={true} // Enable infinite scroll
					autoPlay={false} // AutoPlay is optional
					autoPlaySpeed={3000}
					slidesToSlide={1} // Number of slides to scroll
				>
					{children}
				</Carousel>
			</div>
		</div>
	);
};

export default Slide;
