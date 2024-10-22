const createError = (errStatus, errMsg) => {
	const err = new Error();
	err.status = errStatus;
	err.message = errMsg;
	return err;
};

export default createError;
