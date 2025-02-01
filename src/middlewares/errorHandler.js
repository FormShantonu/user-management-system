export const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            error: {
                type: err.name,
                message: err.message
            }
        });
    }

    // Default to Internal Server Error
    return res.status(500).json({
        error: {
            type: 'InternalServerError',
            message: 'Something went wrong, please try again later'
        }
    });
};

export default errorHandler;