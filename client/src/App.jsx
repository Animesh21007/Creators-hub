import React, { useState } from 'react';
import './App.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Gigs from './pages/gigs/Gigs';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Orders from './pages/orders/Orders';
import Gig from './pages/gig/Gig';
import MyGigs from './pages/myGigs/MyGigs';
import Add from './pages/add/Add';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
import Pay from './pages/pay/Pay';
import Sucess from './pages/sucess/Sucess';
import ProtectedRoute from './context/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
	const queryClient = new QueryClient();

	return (
		<div className="app">
			<QueryClientProvider client={queryClient}>
				<div className="main">
					<Toaster />
					<span>
						<Navbar />
					</span>
					<span className="out">
						<Outlet />
					</span>
					<span className="bot">
						<Footer />
					</span>
				</div>
			</QueryClientProvider>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/gigs',
				element: <Gigs />,
			},
			{
				path: '/gig/:id',
				element: <Gig />,
			},
			{
				path: '/orders',
				element: (
					<ProtectedRoute>
						<Orders />
					</ProtectedRoute>
				),
			},
			{
				path: '/mygigs',
				element: (
					<ProtectedRoute>
						<MyGigs />
					</ProtectedRoute>
				),
			},
			{
				path: '/add',
				element: (
					<ProtectedRoute>
						<Add />
					</ProtectedRoute>
				),
			},
			{
				path: '/message/:id',
				element: (
					<ProtectedRoute>
						<Message />
					</ProtectedRoute>
				),
			},
			{
				path: '/messages',
				element: (
					<ProtectedRoute>
						<Messages />
					</ProtectedRoute>
				),
			},
			{
				path: '/pay/:id',
				element: (
					<ProtectedRoute>
						<Pay />
					</ProtectedRoute>
				),
			},
			{
				path: '/success',
				element: (
					<ProtectedRoute>
						<Sucess />
					</ProtectedRoute>
				),
			},
		],
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
