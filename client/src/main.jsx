import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ToastProvider>
			<App />
			<Toaster />
		</ToastProvider>
	</StrictMode>
);
