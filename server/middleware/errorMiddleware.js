const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle Mongoose CastError (Bad ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `An account with this ${field} already exists.`;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Log server errors securely internally
  if (statusCode === 500) {
    console.error(`[Server Error] ${err.stack || err.message}`);
    message = 'Internal server error. Please try again later.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && statusCode !== 500 ? { stack: err.stack } : {}),
  });
};

module.exports = { notFound, errorHandler };
