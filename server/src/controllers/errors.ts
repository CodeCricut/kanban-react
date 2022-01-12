export class NotAuthenticatedError extends Error {
    constructor(msg: string = "User not defined for request.") {
        super(msg);
        this.name = "NotAuthenticatedError";
    }
}
