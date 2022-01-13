export abstract class ApplicationError extends Error {
    statusCode: number = 500;
    constructor(msg: string) {
        super(msg);
    }
}
export class NotAuthenticatedError extends ApplicationError {
    constructor(msg: string = "Not authenticated.") {
        super(msg);
        this.name = "NotAuthenticatedError";
        this.statusCode = 401;
    }
}

export class NotAuthorizedError extends ApplicationError {
    constructor(msg: string = "Not authorized.") {
        super(msg);
        this.name = "NotAuthenticatedError";
        this.statusCode = 403;
    }
}

export class NotFoundError extends ApplicationError {
    constructor(msg: string = "Not found.") {
        super(msg);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

/**
 * Invalid backing state errors indicate an inconsistency in
 * the database, such as references to deleted entities.
 */
export class InvalidBackingStateError extends ApplicationError {
    constructor(
        msg: string = "Invalid backing state. This typically indicates there is an inconsistency in the database, such as references to deleted entities."
    ) {
        super(msg);
        this.name = "InvalidBackingStateError";
        this.statusCode = 500;
    }
}

export class InvalidCredentialsError extends ApplicationError {
    constructor(msg: string = "Invalid credentials.") {
        super(msg);
        this.name = "InvalidCredentialsError";
        this.statusCode = 400;
    }
}

export class UsernameTakenError extends ApplicationError {
    constructor(msg: string = "Username taken.") {
        super(msg);
        this.name = "UsernameTakenError";
        this.statusCode = 409;
    }
}

export class EmailTakenError extends ApplicationError {
    constructor(msg: string = "Email taken.") {
        super(msg);
        this.name = "EmailTakenError";
        this.statusCode = 409;
    }
}

export class InvalidUsernameError extends ApplicationError {
    constructor(msg: string = "Invalid username.") {
        super(msg);
        this.name = "InvalidUsernameError";
        this.statusCode = 400;
    }
}

export class InvalidEmailError extends ApplicationError {
    constructor(msg: string = "Invalid email.") {
        super(msg);
        this.name = "InvalidEmailError";
        this.statusCode = 400;
    }
}

export class InvalidPasswordError extends ApplicationError {
    constructor(msg: string = "Invalid password.") {
        super(msg);
        this.name = "InvalidPasswordError";
        this.statusCode = 400;
    }
}

/**
 * Error thrown when an invalid JWT is provided with the request.
 */
export class InvalidTokenError extends ApplicationError {
    constructor(msg: string = "Invalid token.") {
        super(msg);
        this.name = "InvalidTokenError";
        this.statusCode = 400;
    }
}
