class AppError extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
		this.isOperation = true;
		Error.captureStackTrace(this, this.constructor); // Clean stack trace
	}
}

const createError = (errStatus, errMsg) => {
	throw new AppError(errStatus, errMsg);
};

export default createError;
