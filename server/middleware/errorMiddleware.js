const { errMessage } = require('./statusCode');

const routeNotFound = (req, res, next) => {
	if (res.statusCode === 200) {
		const error = new Error(`Not found - ${req.originalUrl}`);
		res.status(404);
		next(error);
	} else {
		const error = new Error(
			`${errMessage[res.statusCode]} - ${req.originalUrl} `
		);
		// res.status();
		next(error);
	}
};

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : null,
	});
};

module.exports = {
	routeNotFound,
	errorHandler,
};
