const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem('userInfo'));
};

export default getCurrentUser;
