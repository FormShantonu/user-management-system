class BaseError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends BaseError {
    constructor(message = 'Bad Request') {
        super('BadRequestError', 400, message);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized') {
        super('UnauthorizedError', 401, message);
    }
}

export class ForbiddenError extends BaseError {
    constructor(message = 'Forbidden') {
        super('ForbiddenError', 403, message);
    }
}

export class NotFoundError extends BaseError {
    constructor(message = 'Not Found') {
        super('NotFoundError', 404, message);
    }
}

export class InternalServerError extends BaseError {
    constructor(message = 'Internal Server Error') {
        super('InternalServerError', 500, message);
    }
}
