import React, { useContext, createContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Color code : #211d1d

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const showToast = (type = 'success', message) => {
		switch (type) {
			case 'success':
				toast.success(message);
				break;
			case 'error':
				toast.error(message);
				break;
			case 'loading':
				toast.loading(message);
				break;
			case undefined:
				toast.error('There was an error!');
				break;
			default:
				toast(message);
				break;
		}
	};

	return (
		<ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
	);
};

export const useToast = () => useContext(ToastContext);
