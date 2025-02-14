import React, { useReducer, useState } from 'react';
import './Add.scss';
import upload from './../../utils/upload.js';
import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from './../../utils/api.js';
import { useNavigate } from 'react-router-dom';

const Add = () => {
	const navigate = useNavigate();

	const [singleFile, setSingleFile] = useState(undefined);
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);

	const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

	const handleChange = (e) => {
		e.preventDefault();
		dispatch({
			type: 'CHANGE_INPUT',
			payload: { name: e.target.name, value: e.target.value },
		});
	};

	const handleFeature = (e) => {
		e.preventDefault();
		dispatch({
			type: 'ADD_FEATURE',
			payload: e.target[0].value,
		});
		console.log(state);
		e.target[0].value = '';
	};

	const handleUpload = async () => {
		setUploading(true);
		try {
			const cover = await upload(singleFile);

			const images = await Promise.all(
				[...files]?.map(async (file) => {
					const url = await upload(file);
					return url;
				})
			);
			setUploading(false);
			dispatch({
				type: 'ADD_IMAGES',
				payload: { cover, images },
			});
		} catch (err) {
			console.log(err);
		}
	};

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (gig) => {
			const res = await newRequest.post(`/gigs/newGig`, gig);
			return res;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['myGigs']);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate(state);
		navigate('/mygigs');
	};

	return (
		<div className="add">
			<div className="container">
				<h1>Add New Gig</h1>
				<div className="sections">
					<div className="info">
						<label htmlFor="">Title</label>
						<input
							name="title"
							type="text"
							placeholder="e.g. I will do something I'm really good at"
							onChange={handleChange}
						/>
						<label htmlFor="">Category</label>
						<select name="cat" id="cat" onChange={handleChange}>
							<option value="design">Design</option>
							<option value="web">Web Development</option>
							<option value="animation">Animation</option>
							<option value="music">Music</option>
						</select>
						<div className="images">
							<div className="imagesInputs">
								<label htmlFor="">Cover Image</label>
								<input
									type="file"
									onChange={(e) => setSingleFile(e.target.files[0])}
								/>
								<label htmlFor="">Upload Imagse</label>
								<input
									type="file"
									multiple
									onChange={(e) => setFiles(e.target.files)}
								/>
							</div>
							<button onClick={handleUpload}>
								{uploading ? 'Uploading...' : 'Upload'}
							</button>
						</div>
						<label htmlFor="">Description</label>
						<textarea
							name="desc"
							cols="30"
							rows="16"
							id=""
							onChange={handleChange}
							placeholder="Brief description to introduce your sevice to customers"></textarea>
						<button onClick={(e) => handleSubmit(e)}>Create</button>
					</div>
					<div className="details">
						<label htmlFor="">Service Title</label>
						<input
							type="text"
							placeholder="e.g. One-page web design"
							onChange={handleChange}
							name="shortTitle"
						/>
						<label htmlFor="">Short Description</label>
						<textarea
							name="shortDesc"
							onChange={handleChange}
							id=""
							cols="30"
							rows="10"
							placeholder="Short description of your service"></textarea>
						<label htmlFor="">Delivery Time(e.g. 3 days)</label>
						<input
							type="number"
							min={0}
							onChange={handleChange}
							name="deliveryTime"
						/>
						<label htmlFor="">Revision Number</label>
						<input type="number" min={1} name="revisionNumber" />
						<label htmlFor="">Add Features</label>
						<form action="" className="Add" onSubmit={handleFeature}>
							<input type="text" placeholder="e.g. page design" />
							<button type="submit">add</button>
						</form>
						<div className="addedFeatures">
							{state?.features?.map((feature) => (
								<div className="item" key={Math.random().toString(36)}>
									<button
										onClick={() => {
											dispatch({
												type: 'REMOVE_FEATURE',
												payload: feature,
											});
										}}>
										{feature}
										<span>X</span>
									</button>
								</div>
							))}
						</div>

						<label htmlFor="">Price</label>
						<input type="number" min={1} onChange={handleChange} name="price" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Add;
