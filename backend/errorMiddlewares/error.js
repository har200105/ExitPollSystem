class ErrorHandler extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}

const Handler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	res.status(err.statusCode).json({
		success: false,
		error: err.message,
	});
};

module.exports = { ErrorHandler, Handler };
