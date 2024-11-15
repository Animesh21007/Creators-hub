import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

const ProtectedRoute = ({ children }) => {
	const naviagte = useNavigate();
	const showlogged = useToast();
	const isLoggedIn = localStorage.getItem('userInfo') ? true : false;

	useEffect(() => {
		if (!isLoggedIn) {
			showlogged('Please login first', 'warning');
			setTimeout(() => {
				naviagte('/login');
			}, 500);
			// }
		}

		//		return null;
	}, [isLoggedIn]);

	return children;
};

export default ProtectedRoute;
