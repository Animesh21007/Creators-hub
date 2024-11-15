import React, { useEffect, useRef, useState } from 'react';
import './Gigs.scss';
import GigCard from '../../components/gigCard/GigCard';
// import { gigs } from './../../data';
import Skeleton from 'react-loading-skeleton';
import ListSkeleton from '../../components/listskeleton/ListSkeleton';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/api';
import { useLocation } from 'react-router-dom';

const Gigs = () => {
	const [open, setOpen] = useState(false);
	const [sort, setSort] = useState('sales');
	const minRef = useRef();
	const maxRef = useRef();

	const { search } = useLocation();
	// console.log(minRef.current.value);

	const obj = {
		queryKey: ['gigs'],
		queryFn: async () => {
			const res = await newRequest.get(
				`/gigs?${search}&max=${minRef.current?.value}&min=${maxRef.current?.value}&sort=${sort}`
			);
			// console.log(search);
			return res.data;
		},
	};

	const { isLoading, error, data, refetch } = useQuery(obj);
	// console.log(data);

	if (isLoading)
		return (
			<div className="gigcard" style={{ margin: 'auto' }}>
				{/* Skeleton for cover image */}
				<Skeleton height={200} width="100%" style={{ marginBottom: '10px' }} />

				<div className="info">
					{/* Skeleton for user */}
					<div className="user">
						<Skeleton circle height={40} width={40} />
						<Skeleton height={15} width={100} style={{ marginLeft: '10px' }} />
					</div>

					{/* Skeleton for description */}
					<ListSkeleton count={1} height={15} />

					{/* Skeleton for star rating */}
					<ListSkeleton count={1} height={15} />

					<hr />

					{/* Skeleton for price section */}
					<div className="details">
						<Skeleton height={200} width="40%" />
						<div className="price">
							<Skeleton height={20} width="50%" />
						</div>
					</div>
				</div>
			</div>
		);

	const reSort = (type) => {
		setSort((prev) => type);
		setOpen(false);
	};

	const doApply = () => {
		// console.log(data);
		refetch();
		console.log(location);
		minRef.current.value = null;
		maxRef.current.value = null;
	};
	console.log(data);

	// useEffect(() => {
	// 	refetch();
	// }, [sort]);

	return (
		<div className="gigs">
			<div className="container">
				<span className="breadcrumbs">
					Creators'Hub '{'>'}' GRAPHICS & DESIGN '{'>'}'{' '}
				</span>
				<h1>AI Artists</h1>
				<p>
					Explore the boundries of art and technology with Creators'hub AI
					artists
				</p>
				<div className="menu">
					<div className="left">
						<span>Budget</span>
						<input
							type="number"
							placeholder="min"
							ref={minRef}
							// max={maxRef.current?.value}
						/>
						<input
							type="number"
							placeholder="max"
							// min={minRef.current?.value}
							ref={maxRef}
						/>
						<button onClick={doApply}>Apply</button>
					</div>
					<div className="right">
						<span className="sortBy">SortBy</span>
						<span className="sortType">
							{sort === 'design' ? 'Best Seller' : 'Newest'}
						</span>
						<img src="/images/down.png" alt="" onClick={() => setOpen(!open)} />
						{open && (
							<div className="rightMenu">
								{sort === 'sales' ? (
									<span onClick={() => reSort('createdAt')}>Newest</span>
								) : (
									<span onClick={() => reSort('sales')}>Best Seller</span>
								)}
							</div>
						)}
					</div>
				</div>
				<div className="cards">
					{!isLoading &&
						data?.map((gig) => (
							<GigCard
								key={gig.id * Math.random() || Math.random().toString(36)}
								item={gig}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default Gigs;
