import React, { useContext, createContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const showToast = (message, type = 'success') => {
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
