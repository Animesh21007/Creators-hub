import axios from 'axios';

const newRequest = axios.create({
	baseURL: 'https://creators-hub-ik2d.onrender.com/',
	withCredentials: true,
	// Allows to store cookies
	timeout: 10000,
	// TODO : search about this
});

// Fallback url logic
newRequest.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.code === 'ECONNABORTED') {
			error.config.baseURL = 'http://localhost:8080';
			return axios.request(error.config);
		}
	}
);

export default newRequest;
