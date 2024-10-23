import React from 'react';
import './Add.scss';
import upload from './../../utils/upload';

const Add = () => {
	return (
		<div className="add">
			<div className="container">
				<h1>Add New Gig</h1>
				<div className="sections">
					<div className="info">
						<label htmlFor="">Title</label>
						<input
							type="text"
							placeholder="e.g. I will do something I'm really good at"
						/>
						<label htmlFor="">Category</label>
						<select name="cats" id="cats">
							<option value="design">Design</option>
							<option value="web">Web Development</option>
							<option value="animation">Animation</option>
							<option value="music">Music</option>
						</select>
						<div className="images">
							<div className="imagesInputs">
								<label htmlFor="">Cover Image</label>
								<input type="file" />
								<label htmlFor="">Upload Imagse</label>
								<input type="file" multiple />
							</div>
							<button>uploading</button>
						</div>
						<label htmlFor="">Description</label>
						<textarea
							name=""
							cols="30"
							rows="16"
							id=""
							placeholder="Brief description to introduce your sevice to customers"></textarea>
						<button>Create</button>
					</div>
					<div className="details">
						<label htmlFor="">Service Title</label>
						<input type="text" placeholder="e.g. One-page web design" />
						<label htmlFor="">Short Description</label>
						<textarea
							name=""
							id=""
							cols="30"
							rows="10"
							placeholder="Short description of your service"></textarea>
						<label htmlFor="">Delivery Time(e.g. 3 days)</label>
						<input type="number" min={0} />
						<label htmlFor="">Revision Number</label>
						<input type="number" min={1} />
						<label htmlFor="">Add Features</label>
						<form action="" className="Add">
							<input type="text" placeholder="e.g. page design" />
							<button>add</button>
						</form>
						<input type="text" placeholder="e.g. file uploading" />
						<input type="text" placeholder="e.g. setting up a domain" />
						<input type="text" placeholder="e.g. hosting" />
						<label htmlFor="">Price</label>
						<input type="number" min={1} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Add;
