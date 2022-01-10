export class NotAuthenticatedError extends Error {
    constructor(msg: string = "Not authenticated.") {
        super(msg);
        this.name = "NotAuthenticatedError";
    }
}
