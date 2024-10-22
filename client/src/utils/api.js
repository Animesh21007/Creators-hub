import axios from 'axios';

const newRequest = axios.create({
	baseURL: 'http://localhost:8080/api',
	withCredentials: true,
	// timeout: 10000,
	// Allows to store cookies
	// TODO : search about this
});

export default newRequest;
