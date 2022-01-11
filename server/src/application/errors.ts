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
