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
export class InvalidBackingState extends Error {
    constructor(
        msg: string = "Invalid backing state. This typically indicates there is an inconsistency in the database, such as references to deleted entities."
    ) {
        super(msg);
        this.name = "InvalidBackingState";
    }
}
