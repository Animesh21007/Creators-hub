import { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

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
				toast.error('Something went wrong!');
				break;
			default:
				toast(message);
				break;
		}
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
		</ToastContext.Provider>
	);
};
