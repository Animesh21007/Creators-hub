import React, { useState } from 'react';
import './App.scss';
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

const Layout = () => {
	const queryClient = new QueryClient();

	return (
		<div className="app">
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<Outlet />
				<Footer />
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
				element: <Orders />,
			},
			{
				path: '/mygigs',
				element: <MyGigs />,
			},
			{
				path: '/add',
				element: <Add />,
			},
			{
				path: '/message/:id',
				element: <Message />,
			},
			{
				path: '/messages',
				element: <Messages />,
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
