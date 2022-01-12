export class NotAuthenticatedError extends Error {
    constructor(msg: string = "Not authenticated.") {
        super(msg);
        this.name = "NotAuthenticatedError";
    }
}

export class NotAuthorizedError extends Error {
    constructor(msg: string = "Not authorized.") {
        super(msg);
        this.name = "NotAuthenticatedError";
    }
}

export class NotFoundError extends Error {
    constructor(msg: string = "Not found.") {
        super(msg);
        this.name = "NotFoundError";
    }
}

/**
 * Invalid backing state errors indicate an inconsistency in
 * the database, such as references to deleted entities.
 */
export class InvalidBackingStateError extends Error {
    constructor(
        msg: string = "Invalid backing state. This typically indicates there is an inconsistency in the database, such as references to deleted entities."
    ) {
        super(msg);
        this.name = "InvalidBackingStateError";
    }
}

export class InvalidCredentialsError extends Error {
    constructor(msg: string = "Invalid credentials.") {
        super(msg);
        this.name = "InvalidCredentialsError";
    }
}

export class UsernameTakenError extends Error {
    constructor(msg: string = "Username taken.") {
        super(msg);
        this.name = "UsernameTakenError";
    }
}

export class EmailTakenError extends Error {
    constructor(msg: string = "Email taken.") {
        super(msg);
        this.name = "EmailTakenError";
    }
}

export class InvalidUsernameError extends Error {
    constructor(msg: string = "Invalid username.") {
        super(msg);
        this.name = "InvalidUsernameError";
    }
}

export class InvalidEmailError extends Error {
    constructor(msg: string = "Invalid email.") {
        super(msg);
        this.name = "InvalidEmailError";
    }
}

export class InvalidPasswordError extends Error {
    constructor(msg: string = "Invalid password.") {
        super(msg);
        this.name = "InvalidPasswordError";
    }
}
