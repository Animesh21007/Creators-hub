import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import Add from './pages/add/Add';
import Gig from './pages/gig/Gig';
import Gigs from './pages/gigs/Gigs';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Message from './pages/message/Message';
import Messages from './pages/messages/Messages';
import MyGigs from './pages/myGigs/MyGigs';
import Orders from './pages/orders/Orders';
import Pay from './pages/pay/Pay';
import Register from './pages/register/Register';
import Success from './pages/success/Success';

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
						<Orders />,
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
						<Success />
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
